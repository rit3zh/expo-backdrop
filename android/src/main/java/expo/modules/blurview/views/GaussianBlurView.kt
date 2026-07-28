package expo.modules.blurview.views

import android.content.Context
import android.graphics.RenderEffect
import android.graphics.Shader
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class GaussianBlurView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  var blurRadius: Float = 0f
    set(value) {
      field = value.coerceAtLeast(0f)
      applyBlurEffect()
    }

  var opaque: Boolean = false
    set(value) {
      field = value
      applyBlurEffect()
    }

  init {
    clipChildren = false
    clipToPadding = false
  }

  override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
    super.onSizeChanged(w, h, oldw, oldh)
    applyBlurEffect()
  }

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    setMeasuredDimension(
      MeasureSpec.getSize(widthMeasureSpec),
      MeasureSpec.getSize(heightMeasureSpec)
    )
  }

  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) = Unit

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    applyBlurEffect()
  }

  fun reapplyBlurEffect() {
    applyBlurEffect()
  }

  private fun applyBlurEffect() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
      if (blurRadius > 0f && !warnedUnsupported) {
        warnedUnsupported = true
        Log.w(
          TAG,
          "blurRadius requires Android 12 (API 31); RenderEffect is unavailable on API " +
            "${Build.VERSION.SDK_INT}, so the content renders unblurred."
        )
      }
      return
    }
    applyBlurEffectApi31()
  }

  @RequiresApi(Build.VERSION_CODES.S)
  private fun applyBlurEffectApi31() {
    if (blurRadius <= 0f) {
      setRenderEffect(null)
      return
    }

    val radiusPx = (blurRadius * resources.displayMetrics.density).coerceAtLeast(0.01f)
    val tileMode = if (opaque) Shader.TileMode.CLAMP else Shader.TileMode.DECAL
    setRenderEffect(RenderEffect.createBlurEffect(radiusPx, radiusPx, tileMode))
  }

  private companion object {
    const val TAG = "ExpoBackdrop"
    var warnedUnsupported = false
  }
}
