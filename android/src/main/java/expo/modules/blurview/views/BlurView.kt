package expo.modules.blurview.views

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.view.View
import com.qmdeve.blurview.util.Utils
import com.qmdeve.blurview.widget.BlurView as QmBlurView
import expo.modules.blurview.enums.TintStyle
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class BlurView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  internal val blurView = QmBlurView(context, null)

  private var autoUpdateEnabled = true

  init {
    addView(blurView, 0)
  }

  var intensity: Float = DEFAULT_INTENSITY
    set(value) {
      field = value.coerceIn(0f, 100f)
      applyBlurRadius()
      applyTint()
    }

  var blurReductionFactor: Float = DEFAULT_BLUR_REDUCTION
    set(value) {
      field = value.coerceAtLeast(0.1f)
      applyBlurRadius()
    }

  var blurRadius: Float = 0f
    set(value) {
      field = value.coerceAtLeast(0f)
      applyBlurRadius()
    }

  var downsampleFactor: Float = 0f
    set(value) {
      field = value.coerceIn(0f, 32f)
      blurView.setDownsampleFactor(field)
    }

  var tint: TintStyle = TintStyle.DEFAULT
    set(value) {
      field = value
      applyTint()
    }

  var tintColor: Int = Color.TRANSPARENT
    set(value) {
      field = value
      applyTint()
    }

  var blurRounds: Int = DEFAULT_BLUR_ROUNDS
    set(value) {
      field = value.coerceIn(1, 15)
      blurView.setBlurRounds(field)
    }

  var blurEnabled: Boolean = true
    set(value) {
      field = value
      blurView.visibility = if (value) VISIBLE else GONE
    }

  var autoUpdate: Boolean = true
    set(value) {
      field = value
      applyAutoUpdate()
    }

  private fun applyBlurRadius() {
    val dp = if (blurRadius > 0f) {
      blurRadius
    } else {
      (intensity / 100f) * MAX_RADIUS_DP * (DEFAULT_BLUR_REDUCTION / blurReductionFactor)
    }
    blurView.setBlurRadius(dp * resources.displayMetrics.density)
  }

  private fun applyTint() {
    val color = if (Color.alpha(tintColor) > 0) tintColor else tint.toOverlayColor(intensity)
    blurView.setOverlayColor(color)
  }

  fun setCornerRadii(topLeft: Float, topRight: Float, bottomRight: Float, bottomLeft: Float) {
    blurView.setTopLeftCornerRadius(topLeft.coerceAtLeast(0f))
    blurView.setTopRightCornerRadius(topRight.coerceAtLeast(0f))
    blurView.setBottomRightCornerRadius(bottomRight.coerceAtLeast(0f))
    blurView.setBottomLeftCornerRadius(bottomLeft.coerceAtLeast(0f))
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    applyAutoUpdate()
  }

  private fun applyAutoUpdate() {
    if (autoUpdateEnabled == autoUpdate) return
    val decorView: View = blurView.mDecorView ?: return
    val observer = decorView.viewTreeObserver
    if (!observer.isAlive) return

    if (autoUpdate) {
      observer.addOnPreDrawListener(blurView.preDrawListener)
    } else {
      observer.removeOnPreDrawListener(blurView.preDrawListener)
    }
    autoUpdateEnabled = autoUpdate
  }

  override fun draw(canvas: Canvas) {
    if (Utils.sIsGlobalCapturing) return
    super.draw(canvas)
  }

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    setMeasuredDimension(
      MeasureSpec.getSize(widthMeasureSpec),
      MeasureSpec.getSize(heightMeasureSpec)
    )
    blurView.measure(
      MeasureSpec.makeMeasureSpec(measuredWidth, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(measuredHeight, MeasureSpec.EXACTLY)
    )
  }

  override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    blurView.layout(0, 0, r - l, b - t)
  }

  companion object {
    const val DEFAULT_INTENSITY = 50f
    const val DEFAULT_BLUR_ROUNDS = 2
    const val DEFAULT_BLUR_REDUCTION = 4f
    const val MAX_RADIUS_DP = 50f
    const val RESERVED_CHILDREN = 1
  }
}
