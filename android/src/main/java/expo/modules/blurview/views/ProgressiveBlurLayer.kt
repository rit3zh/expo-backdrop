package expo.modules.blurview.views

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BlendMode
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.PorterDuff
import android.graphics.PorterDuffXfermode
import android.graphics.Rect
import android.graphics.RenderEffect
import android.graphics.RenderNode
import android.graphics.Shader
import android.os.Build
import androidx.annotation.RequiresApi
import com.qmdeve.blurview.BlurNative
import com.qmdeve.blurview.util.Utils
import com.qmdeve.blurview.widget.BlurView as QmBlurView
import expo.modules.blurview.enums.ProgressiveBlurEdge
import kotlin.math.asin
import kotlin.math.ceil
import kotlin.math.floor
import kotlin.math.max
import kotlin.math.roundToInt
import kotlin.math.sin
import kotlin.math.sqrt

internal class ProgressiveBlurLayer(context: Context) : QmBlurView(context, null) {
  var edge: ProgressiveBlurEdge = ProgressiveBlurEdge.TOP
    set(value) {
      if (field == value) return
      field = value
      invalidateShaders()
    }

  var fadeLength: Float = 1f
    set(value) {
      if (field == value) return
      field = value
      invalidateShaders()
    }

  var washColor: Int = Color.TRANSPARENT
    set(value) {
      if (field == value) return
      field = value
      invalidateShaders()
    }

  var radius: Float = 0f
    set(value) {
      if (field == value) return
      field = value
      setBlurRadius(value)
      setDownsampleFactor(max(MIN_CAPTURE_SCALE, value * levelStrength(0) / LEVEL_RADIUS))
    }

  private val gpuLevels = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) List(LEVEL_COUNT) { GpuLevel() } else null
  private val cpuLevels = List(LEVEL_COUNT) { CpuLevel() }
  private var blursOnGpu = false

  private val maskPaint = Paint().apply { xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_IN) }
  private val washPaint = Paint()
  private val sourceRect = Rect()
  private val destinationRect = Rect()
  private var bands: List<Band>? = null

  init {
    setOverlayColor(Color.TRANSPARENT)
  }

  override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
    super.onSizeChanged(w, h, oldw, oldh)
    invalidateShaders()
  }

  override fun blur(input: Bitmap, output: Bitmap) {
    if (width == 0 || height == 0) return

    val gpuLevels = gpuLevels
    if (gpuLevels != null && isHardwareAccelerated) {
      if (!blursOnGpu) {
        blursOnGpu = true
        cpuLevels.forEach { it.release() }
      }
      val bands = bands()
      for ((index, level) in gpuLevels.withIndex()) {
        val levelRadius = radius * levelStrength(index) * input.width / width
        level.record(input, levelRadius, edge, bands[index])
      }
    } else {
      blursOnGpu = false
      blurOnCpu(input)
    }
  }

  private fun blurOnCpu(input: Bitmap) {
    var source = input
    var sourceRadius = 0f
    for ((index, level) in cpuLevels.withIndex()) {
      val levelRadius = radius * levelStrength(index)
      val scale = max(width.toFloat() / input.width, levelRadius / LEVEL_RADIUS)
      val bitmap = level.render(source, (width / scale).roundToInt(), (height / scale).roundToInt())

      val addedRadius = sqrt(max(levelRadius * levelRadius - sourceRadius * sourceRadius, 0f))
      level.blur.setBlurRounds(blurRounds)
      level.blur.prepare(bitmap, addedRadius * bitmap.width / width)
      level.blur.blur(bitmap, bitmap)

      source = bitmap
      sourceRadius = levelRadius
    }
  }

  override fun releaseBitmap() {
    super.releaseBitmap()
    cpuLevels.forEach { it.release() }
    gpuLevels?.forEach { it.release() }
  }

  override fun onDraw(canvas: Canvas) {
    if (Utils.sIsGlobalCapturing || width == 0 || height == 0) return
    val bands = bands()

    destinationRect.set(0, 0, width, height)
    val gpuLevels = gpuLevels
    if (blursOnGpu && gpuLevels != null && canvas.isHardwareAccelerated) {
      for ((index, band) in bands.withIndex()) {
        gpuLevels[index].draw(canvas, band.rect, width, height)
      }
    } else {
      for ((index, band) in bands.withIndex()) {
        drawCpuLevel(canvas, cpuLevels[index].bitmap ?: continue, band)
      }
    }

    if (washColor ushr 24 != 0) {
      canvas.drawRect(destinationRect, washPaint)
    }
  }

  private fun drawCpuLevel(canvas: Canvas, bitmap: Bitmap, band: Band) {
    if (band.rect.isEmpty) return
    val save = canvas.saveLayer(
      band.rect.left.toFloat(),
      band.rect.top.toFloat(),
      band.rect.right.toFloat(),
      band.rect.bottom.toFloat(),
      null
    )
    sourceRect.set(0, 0, bitmap.width, bitmap.height)
    canvas.drawBitmap(bitmap, sourceRect, destinationRect, FILTER_PAINT)
    maskPaint.shader = band.mask
    canvas.drawRect(band.rect, maskPaint)
    canvas.restoreToCount(save)
  }

  private fun bands(): List<Band> = bands ?: createBands().also { bands = it }

  private fun invalidateShaders() {
    bands = null
    washPaint.shader = if (width > 0 && height > 0) {
      val stops = fade(0f, fadeLength, rising = true) + GradientStop(1f, 1f)
      edgeGradient(edge, width, height, washColor, stops)
    } else {
      null
    }
    invalidate()
  }

  private fun createBands(): List<Band> =
    (0 until LEVEL_COUNT).map { index ->
      val stops = (0..FADE_SAMPLES).map { sample ->
        val t = sample.toFloat() / FADE_SAMPLES
        GradientStop(positionAtDepth(index + t), t)
      } + GradientStop(1f, 1f)
      val start = positionAtDepth(index.toFloat())
      val end = if (index == LEVEL_COUNT - 1) 1f else positionAtDepth(index + 2f)
      val rect = if (end > start) rectBetween(start, end) else Rect()
      Band(stops, rect, edgeGradient(edge, width, height, Color.BLACK, stops))
    }

  private fun positionAtDepth(depth: Float): Float =
    fadeLength * inverseSmoothstep((depth / LEVEL_COUNT).coerceIn(0f, 1f))

  private fun rectBetween(start: Float, end: Float): Rect {
    val w = width.toFloat()
    val h = height.toFloat()
    return when (edge) {
      ProgressiveBlurEdge.TOP -> Rect(0, floor(h * (1 - end)).toInt(), width, ceil(h * (1 - start)).toInt())
      ProgressiveBlurEdge.BOTTOM -> Rect(0, floor(h * start).toInt(), width, ceil(h * end).toInt())
      ProgressiveBlurEdge.LEFT -> Rect(floor(w * (1 - end)).toInt(), 0, ceil(w * (1 - start)).toInt(), height)
      ProgressiveBlurEdge.RIGHT -> Rect(floor(w * start).toInt(), 0, ceil(w * end).toInt(), height)
    }
  }

  private class Band(val stops: List<GradientStop>, val rect: Rect, val mask: Shader)

  @RequiresApi(Build.VERSION_CODES.S)
  private class GpuLevel {
    private val node = RenderNode("ProgressiveBlurLevel")
    private var recorded = false
    private var effectRadius = -1f
    private var effectBand: Band? = null
    private var effectWidth = 0
    private var effectHeight = 0

    fun record(source: Bitmap, radius: Float, edge: ProgressiveBlurEdge, band: Band) {
      if (band.rect.isEmpty) {
        release()
        return
      }
      val w = source.width
      val h = source.height
      if (radius != effectRadius || band !== effectBand || w != effectWidth || h != effectHeight) {
        effectRadius = radius
        effectBand = band
        effectWidth = w
        effectHeight = h
        val blur = RenderEffect.createBlurEffect(radius.coerceAtLeast(MIN_GPU_RADIUS), radius.coerceAtLeast(MIN_GPU_RADIUS), Shader.TileMode.CLAMP)
        val mask = RenderEffect.createShaderEffect(edgeGradient(edge, w, h, Color.BLACK, band.stops))
        node.setRenderEffect(RenderEffect.createBlendModeEffect(blur, mask, BlendMode.DST_IN))
      }

      node.setPosition(0, 0, w, h)
      val canvas = node.beginRecording(w, h)
      try {
        canvas.drawBitmap(source, 0f, 0f, null)
      } finally {
        node.endRecording()
      }
      recorded = true
    }

    fun draw(canvas: Canvas, bandRect: Rect, width: Int, height: Int) {
      if (!recorded || effectWidth == 0 || effectHeight == 0) return
      val save = canvas.save()
      canvas.clipRect(bandRect)
      canvas.scale(width.toFloat() / effectWidth, height.toFloat() / effectHeight)
      canvas.drawRenderNode(node)
      canvas.restoreToCount(save)
    }

    fun release() {
      node.discardDisplayList()
      recorded = false
    }
  }

  private class CpuLevel {
    val blur = BlurNative()
    var bitmap: Bitmap? = null
      private set
    private var canvas: Canvas? = null
    private val sourceRect = Rect()
    private val destinationRect = Rect()

    fun render(source: Bitmap, width: Int, height: Int): Bitmap {
      val w = width.coerceAtLeast(1)
      val h = height.coerceAtLeast(1)
      val current = bitmap
      val target = if (current != null && !current.isRecycled && current.width == w && current.height == h) {
        current
      } else {
        release()
        Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888).also {
          bitmap = it
          canvas = Canvas(it)
        }
      }
      sourceRect.set(0, 0, source.width, source.height)
      destinationRect.set(0, 0, w, h)
      canvas?.drawBitmap(source, sourceRect, destinationRect, COPY_PAINT)
      return target
    }

    fun release() {
      bitmap?.recycle()
      bitmap = null
      canvas = null
    }
  }

  private companion object {
    const val LEVEL_COUNT = 8

    const val LEVEL_RADIUS = 5f

    const val MIN_CAPTURE_SCALE = 4f

    const val MIN_GPU_RADIUS = 0.5f

    val FILTER_PAINT = Paint(Paint.FILTER_BITMAP_FLAG)

    val COPY_PAINT = Paint(Paint.FILTER_BITMAP_FLAG).apply {
      xfermode = PorterDuffXfermode(PorterDuff.Mode.SRC)
    }

    fun levelStrength(index: Int): Float = (index + 1).toFloat() / LEVEL_COUNT

    fun inverseSmoothstep(value: Float): Float = 0.5f - sin(asin(1 - 2 * value) / 3)
  }
}
