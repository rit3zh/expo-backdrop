package expo.modules.blurview.views

import android.content.Context
import android.content.res.Configuration
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Rect
import android.graphics.drawable.ColorDrawable
import android.os.Handler
import android.os.Looper
import android.util.TypedValue
import android.view.View
import android.view.ViewGroup
import android.widget.HorizontalScrollView
import android.widget.ScrollView
import com.facebook.react.uimanager.BackgroundStyleApplicator
import com.qmdeve.blurview.util.Utils
import expo.modules.blurview.enums.ProgressiveBlurEdge
import expo.modules.blurview.enums.TintStyle
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import kotlin.math.roundToInt

class ProgressiveBlurView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val blurLayer = ProgressiveBlurLayer(context)
  private val fallbackGradient = GradientView(context)
  private val scrollMonitor = ScrollBlurMonitor(resources.displayMetrics.density)
  private val mainHandler = Handler(Looper.getMainLooper())

  private var liveBlurAmount = 1f

  private val scrollViewCheck = object : Runnable {
    override fun run() {
      reattachIfScrollViewLeft()
      mainHandler.postDelayed(this, SCROLL_VIEW_CHECK_INTERVAL_MS)
    }
  }

  var intensity: Float = DEFAULT_INTENSITY
    set(value) {
      field = value
      applyIntensity()
      updateGradients()
      updateLayerVisibility()
    }

  var tint: TintStyle = TintStyle.SYSTEM_ULTRA_THIN_MATERIAL
    set(value) {
      field = value
      updateGradients()
    }

  var blurTintColor: Int? = null
    set(value) {
      field = value
      updateGradients()
    }

  var edge: ProgressiveBlurEdge = ProgressiveBlurEdge.TOP
    set(value) {
      field = value
      blurLayer.edge = value
      updateGradients()
      updateLayerVisibility()
    }

  var startOffset: Float = 0f
    set(value) {
      field = value
      blurLayer.fadeLength = fadeLength
      updateGradients()
    }

  var scrollFallback: Boolean = true
    set(value) {
      field = value
      scrollMonitor.tracksSpeed = value
      updateLayerVisibility()
    }

  var fallbackColor: Int? = null
    set(value) {
      field = value
      updateGradients()
    }

  init {
    addView(blurLayer, 0)
    fallbackGradient.visibility = INVISIBLE
    addView(fallbackGradient, 1)

    scrollMonitor.tracksSpeed = scrollFallback
    scrollMonitor.onScroll = { updateLayerVisibility() }
    scrollMonitor.onContentChange = { updateLayerVisibility() }
    scrollMonitor.onBlurAmountChange = { amount ->
      liveBlurAmount = amount
      updateLayerVisibility()
    }
    applyIntensity()
  }

  private val fadeLength: Float
    get() = 1 - startOffset.coerceIn(0f, 1f)

  private val strength: Float
    get() = intensity.coerceIn(0f, 100f) / 100f

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    setMeasuredDimension(
      MeasureSpec.getSize(widthMeasureSpec),
      MeasureSpec.getSize(heightMeasureSpec)
    )
  }

  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    blurLayer.layoutExactly(0, 0, r - l, b - t)
    fallbackGradient.layoutExactly(0, 0, r - l, b - t)
    updateGradients()

    if (scrollMonitor.scrollView == null) {
      attachScrollMonitor()
    }
    updateLayerVisibility()
  }

  override fun onConfigurationChanged(newConfig: Configuration?) {
    super.onConfigurationChanged(newConfig)
    updateGradients()
  }

  private fun applyIntensity() {
    val radius = strength * BlurView.MAX_RADIUS_DP * resources.displayMetrics.density
    if (radius <= 0f) return
    blurLayer.radius = radius
  }

  private fun updateGradients() {
    val background = backgroundColorBehind()

    val wash = blurTintColor ?: withAlpha(background, DEFAULT_WASH_OPACITY)
    blurLayer.washColor = if (Color.alpha(wash) > 0) wash else tint.toOverlayColor(intensity)

    val fallback = fallbackColor ?: background
    val stops = fade(0f, fadeLength, rising = true) + GradientStop(1f, 1f)
    fallbackGradient.update(edge, fallback, stops.map { GradientStop(it.location, it.alpha * strength) })
  }

  private fun backgroundColorBehind(): Int {
    var ancestor = parent as? View
    while (ancestor != null) {
      val color = runCatching { BackgroundStyleApplicator.getBackgroundColor(ancestor) }.getOrNull()
        ?: (ancestor.background as? ColorDrawable)?.color
      if (color != null && Color.alpha(color) == 255) {
        return color
      }
      ancestor = ancestor.parent as? View
    }
    val typedValue = TypedValue()
    return if (context.theme.resolveAttribute(android.R.attr.colorBackground, typedValue, true) &&
      typedValue.type >= TypedValue.TYPE_FIRST_COLOR_INT &&
      typedValue.type <= TypedValue.TYPE_LAST_COLOR_INT
    ) {
      typedValue.data
    } else {
      Color.WHITE
    }
  }

  private fun updateLayerVisibility() {
    val coverage = contentCoverage()
    val blurAmount = if (scrollFallback) liveBlurAmount else 1f

    val blurAlpha = blurAmount * coverage
    blurLayer.showWith(blurAlpha, blurAlpha > 0f && strength > 0f)

    val fallbackAlpha = (1 - blurAmount) * coverage
    fallbackGradient.showWith(fallbackAlpha, fallbackAlpha > 0f)
  }

  private fun contentCoverage(): Float {
    val scrollView = scrollMonitor.scrollView ?: return 1f
    val content = scrollView.getChildAt(0)
    val contentWidth = (content?.width ?: 0) + scrollView.paddingLeft + scrollView.paddingRight
    val contentHeight = (content?.height ?: 0) + scrollView.paddingTop + scrollView.paddingBottom
    val maxScrollX = (contentWidth - scrollView.width).coerceAtLeast(0)
    val maxScrollY = (contentHeight - scrollView.height).coerceAtLeast(0)

    val hiddenContent = when (edge) {
      ProgressiveBlurEdge.TOP -> scrollView.scrollY
      ProgressiveBlurEdge.BOTTOM -> maxScrollY - scrollView.scrollY
      ProgressiveBlurEdge.LEFT -> scrollView.scrollX
      ProgressiveBlurEdge.RIGHT -> maxScrollX - scrollView.scrollX
    }
    return smoothstep(0f, COVERAGE_FADE_DISTANCE, hiddenContent / resources.displayMetrics.density)
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    attachScrollMonitor()
    mainHandler.removeCallbacks(scrollViewCheck)
    mainHandler.postDelayed(scrollViewCheck, SCROLL_VIEW_CHECK_INTERVAL_MS)
  }

  override fun onDetachedFromWindow() {
    mainHandler.removeCallbacks(scrollViewCheck)
    scrollMonitor.stop()
    super.onDetachedFromWindow()
  }

  private fun attachScrollMonitor() {
    if (!isAttachedToWindow) {
      scrollMonitor.stop()
      return
    }
    scrollMonitor.observe(findScrollViewBehind())
    updateGradients()
    updateLayerVisibility()
  }

  private fun reattachIfScrollViewLeft() {
    val scrollView = scrollMonitor.scrollView ?: return
    if (scrollView.isAttachedToWindow) return
    scrollMonitor.stop()
    attachScrollMonitor()
  }

  private fun findScrollViewBehind(): ViewGroup? {
    val frame = rectInWindow(this)
    var child: View = this
    var container = child.parent as? ViewGroup

    while (container != null) {
      val index = container.indexOfChild(child)
      for (i in index - 1 downTo 0) {
        scrollView(container.getChildAt(i), frame)?.let { return it }
      }
      child = container
      container = container.parent as? ViewGroup
    }
    return null
  }

  private fun scrollView(view: View, frame: Rect): ViewGroup? {
    if (view.visibility != VISIBLE || !Rect.intersects(rectInWindow(view), frame)) return null
    if (view is ScrollView || view is HorizontalScrollView) {
      return view as ViewGroup
    }
    if (view is ViewGroup) {
      for (i in view.childCount - 1 downTo 0) {
        scrollView(view.getChildAt(i), frame)?.let { return it }
      }
    }
    return null
  }

  override fun draw(canvas: Canvas) {
    if (Utils.sIsGlobalCapturing) return
    super.draw(canvas)
  }

  override fun dispatchDraw(canvas: Canvas) {
    if (Utils.sIsGlobalCapturing) return
    super.dispatchDraw(canvas)
  }

  companion object {
    const val DEFAULT_INTENSITY = 50f
    const val RESERVED_CHILDREN = 2

    private const val COVERAGE_FADE_DISTANCE = 24f

    private const val SCROLL_VIEW_CHECK_INTERVAL_MS = 500L

    private const val DEFAULT_WASH_OPACITY = 0.85f

    private fun withAlpha(color: Int, alpha: Float): Int =
      (color and 0x00FFFFFF) or ((Color.alpha(color) * alpha).roundToInt() shl 24)

    private fun rectInWindow(view: View): Rect {
      val location = IntArray(2)
      view.getLocationInWindow(location)
      return Rect(location[0], location[1], location[0] + view.width, location[1] + view.height)
    }

    private fun View.layoutExactly(l: Int, t: Int, r: Int, b: Int) {
      measure(
        MeasureSpec.makeMeasureSpec((r - l).coerceAtLeast(0), MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec((b - t).coerceAtLeast(0), MeasureSpec.EXACTLY)
      )
      layout(l, t, r, b)
    }

    private fun View.showWith(alpha: Float, visible: Boolean) {
      if (this.alpha != alpha) this.alpha = alpha
      val target = if (visible) VISIBLE else INVISIBLE
      if (visibility != target) visibility = target
    }
  }
}

private class GradientView(context: Context) : View(context) {
  private val paint = Paint()
  private var edge = ProgressiveBlurEdge.TOP
  private var color = Color.TRANSPARENT
  private var stops: List<GradientStop> = emptyList()
  private var shaderDirty = true

  fun update(edge: ProgressiveBlurEdge, color: Int, stops: List<GradientStop>) {
    if (this.edge == edge && this.color == color && this.stops == stops) return
    this.edge = edge
    this.color = color
    this.stops = stops
    shaderDirty = true
    invalidate()
  }

  override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
    super.onSizeChanged(w, h, oldw, oldh)
    shaderDirty = true
  }

  override fun onDraw(canvas: Canvas) {
    if (width == 0 || height == 0 || stops.isEmpty()) return
    if (shaderDirty) {
      paint.shader = createShader()
      shaderDirty = false
    }
    canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)
  }

  private fun createShader() = edgeGradient(edge, width, height, color, stops)
}
