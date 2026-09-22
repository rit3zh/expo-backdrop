package expo.modules.blurview.views

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.view.ViewTreeObserver
import java.lang.ref.WeakReference
import kotlin.math.abs
import kotlin.math.hypot
import kotlin.math.max
import kotlin.math.min

internal class ScrollBlurMonitor(private val density: Float) {
  private var scrollViewRef: WeakReference<ViewGroup>? = null
  val scrollView: ViewGroup?
    get() = scrollViewRef?.get()

  var blurAmount = 1f
    private set

  var onScroll: (() -> Unit)? = null

  var onContentChange: (() -> Unit)? = null
  var onBlurAmountChange: ((Float) -> Unit)? = null

  var tracksSpeed = false
    set(value) {
      field = value
      if (!value) stopTrackingSpeed()
    }

  private var observer: ViewTreeObserver? = null
  private var lastScrollX = 0
  private var lastScrollY = 0
  private var lastContentWidth = 0
  private var lastContentHeight = 0

  private var frameScheduled = false
  private var lastSampleX = 0
  private var lastSampleY = 0
  private var lastFrameNanos = 0L

  private var speed = 0f

  private val scrollListener = ViewTreeObserver.OnScrollChangedListener {
    val view = scrollView ?: return@OnScrollChangedListener
    if (view.scrollX == lastScrollX && view.scrollY == lastScrollY) return@OnScrollChangedListener
    val oldX = lastScrollX
    val oldY = lastScrollY
    lastScrollX = view.scrollX
    lastScrollY = view.scrollY
    onScroll?.invoke()
    scrollViewDidScroll(oldX, oldY)
  }

  private val layoutListener = ViewTreeObserver.OnGlobalLayoutListener {
    val content = scrollView?.getChildAt(0) ?: return@OnGlobalLayoutListener
    if (content.width == lastContentWidth && content.height == lastContentHeight) {
      return@OnGlobalLayoutListener
    }
    lastContentWidth = content.width
    lastContentHeight = content.height
    onContentChange?.invoke()
  }

  private val frameCallback = Choreographer.FrameCallback { frameTimeNanos -> step(frameTimeNanos) }

  fun observe(scrollView: ViewGroup?) {
    if (scrollView === this.scrollView) return
    stop()
    if (scrollView == null) return

    scrollViewRef = WeakReference(scrollView)
    lastScrollX = scrollView.scrollX
    lastScrollY = scrollView.scrollY
    val content: View? = scrollView.getChildAt(0)
    lastContentWidth = content?.width ?: 0
    lastContentHeight = content?.height ?: 0

    observer = scrollView.viewTreeObserver.also {
      it.addOnScrollChangedListener(scrollListener)
      it.addOnGlobalLayoutListener(layoutListener)
    }
  }

  fun stop() {
    val target = observer?.takeIf { it.isAlive } ?: scrollView?.viewTreeObserver
    target?.takeIf { it.isAlive }?.let {
      it.removeOnScrollChangedListener(scrollListener)
      it.removeOnGlobalLayoutListener(layoutListener)
    }
    observer = null
    scrollViewRef = null
    stopTrackingSpeed()
  }

  private fun stopTrackingSpeed() {
    if (frameScheduled) {
      Choreographer.getInstance().removeFrameCallback(frameCallback)
      frameScheduled = false
    }
    speed = 0f
    setBlurAmount(1f)
  }

  private fun scrollViewDidScroll(oldX: Int, oldY: Int) {
    if (!tracksSpeed || frameScheduled) return
    lastSampleX = oldX
    lastSampleY = oldY
    lastFrameNanos = System.nanoTime()
    frameScheduled = true
    Choreographer.getInstance().postFrameCallback(frameCallback)
  }

  private fun step(frameTimeNanos: Long) {
    frameScheduled = false
    val view = scrollView
    if (view == null) {
      stop()
      return
    }

    val elapsed = max((frameTimeNanos - lastFrameNanos) / 1e9f, 1f / 240)
    val dx = (view.scrollX - lastSampleX) / density
    val dy = (view.scrollY - lastSampleY) / density
    val instantSpeed = hypot(dx, dy) / elapsed
    lastSampleX = view.scrollX
    lastSampleY = view.scrollY
    lastFrameNanos = frameTimeNanos

    speed += (instantSpeed - speed) * min(1f, elapsed / SPEED_SMOOTHING)

    val target = 1 - smoothstep(SLOW_SPEED, FAST_SPEED, speed)
    val duration = if (target < blurAmount) FADE_OUT_DURATION else FADE_IN_DURATION
    var next = blurAmount + (target - blurAmount) * min(1f, elapsed / duration)
    if (abs(target - next) < 0.01f) {
      next = target
    }
    setBlurAmount(next)

    if (speed < 5 && blurAmount == 1f) {
      speed = 0f
      return
    }
    frameScheduled = true
    Choreographer.getInstance().postFrameCallback(frameCallback)
  }

  private fun setBlurAmount(amount: Float) {
    if (amount == blurAmount) return
    blurAmount = amount
    onBlurAmountChange?.invoke(amount)
  }

  private companion object {
    const val SLOW_SPEED = 500f
    const val FAST_SPEED = 1500f

    const val SPEED_SMOOTHING = 0.1f
    const val FADE_OUT_DURATION = 0.08f
    const val FADE_IN_DURATION = 0.2f
  }
}

internal fun smoothstep(edge0: Float, edge1: Float, x: Float): Float {
  val t = ((x - edge0) / (edge1 - edge0)).coerceIn(0f, 1f)
  return t * t * (3 - 2 * t)
}
