package expo.modules.blurview.views

import android.graphics.LinearGradient
import android.graphics.Shader
import expo.modules.blurview.enums.ProgressiveBlurEdge
import kotlin.math.roundToInt

internal data class GradientStop(val location: Float, val alpha: Float)

internal const val FADE_SAMPLES = 8

internal fun fade(start: Float, end: Float, rising: Boolean): List<GradientStop> =
  (0..FADE_SAMPLES).map { sample ->
    val t = sample.toFloat() / FADE_SAMPLES
    val eased = smoothstep(0f, 1f, t)
    GradientStop(start + (end - start) * t, if (rising) eased else 1 - eased)
  }

internal fun edgeGradient(
  edge: ProgressiveBlurEdge,
  width: Int,
  height: Int,
  color: Int,
  stops: List<GradientStop>
): Shader {
  val w = width.toFloat()
  val h = height.toFloat()
  val (x0, y0, x1, y1) = when (edge) {
    ProgressiveBlurEdge.TOP -> listOf(0f, h, 0f, 0f)
    ProgressiveBlurEdge.BOTTOM -> listOf(0f, 0f, 0f, h)
    ProgressiveBlurEdge.LEFT -> listOf(w, 0f, 0f, 0f)
    ProgressiveBlurEdge.RIGHT -> listOf(0f, 0f, w, 0f)
  }
  val baseAlpha = color ushr 24
  val colors = stops.map { stop ->
    val alpha = (baseAlpha * stop.alpha.coerceIn(0f, 1f)).roundToInt()
    (color and 0x00FFFFFF) or (alpha shl 24)
  }.toIntArray()

  var last = 0f
  val positions = stops.map { stop ->
    last = maxOf(last, stop.location.coerceIn(0f, 1f))
    last
  }.toFloatArray()
  return LinearGradient(x0, y0, x1, y1, colors, positions, Shader.TileMode.CLAMP)
}
