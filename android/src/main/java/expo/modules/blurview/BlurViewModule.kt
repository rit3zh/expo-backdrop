package expo.modules.blurview

import android.graphics.Color
import android.view.View
import expo.modules.blurview.enums.ProgressiveBlurEdge
import expo.modules.blurview.enums.TintStyle
import expo.modules.blurview.records.CornerRadii
import expo.modules.blurview.views.BlurView
import expo.modules.blurview.views.GaussianBlurView
import expo.modules.blurview.views.ProgressiveBlurView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.types.ColorCompat

class BlurViewModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("BlurView")

    View(BlurView::class) {
      GroupView<BlurView> {
        AddChildView { parent: BlurView, child: View, index: Int ->
          parent.addView(child, index + BlurView.RESERVED_CHILDREN)
        }
        GetChildCount { view: BlurView ->
          (view.childCount - BlurView.RESERVED_CHILDREN).coerceAtLeast(0)
        }
        GetChildViewAt { view: BlurView, index: Int ->
          view.getChildAt(index + BlurView.RESERVED_CHILDREN)
        }
        RemoveChildViewAt { view: BlurView, index: Int ->
          view.removeViewAt(index + BlurView.RESERVED_CHILDREN)
        }
        RemoveChildView { view: BlurView, child: View ->
          view.removeView(child)
        }
      }

      Prop("intensity") { view: BlurView, intensity: Float? ->
        view.intensity = intensity ?: BlurView.DEFAULT_INTENSITY
      }

      Prop("blurReductionFactor") { view: BlurView, factor: Float? ->
        view.blurReductionFactor = factor ?: BlurView.DEFAULT_BLUR_REDUCTION
      }

      Prop("blurRadius") { view: BlurView, radius: Float? ->
        view.blurRadius = radius ?: 0f
      }

      Prop("downsampleFactor") { view: BlurView, factor: Float? ->
        view.downsampleFactor = factor ?: 0f
      }

      Prop("blurRounds") { view: BlurView, rounds: Int? ->
        view.blurRounds = rounds ?: BlurView.DEFAULT_BLUR_ROUNDS
      }

      Prop("tint") { view: BlurView, tint: TintStyle? ->
        view.tint = tint ?: TintStyle.DEFAULT
      }

      Prop("tintColor") { view: BlurView, tintColor: Color? ->
        view.tintColor = tintColor?.let { ColorCompat.toArgb(it) } ?: Color.TRANSPARENT
      }

      Prop("blurEnabled") { view: BlurView, enabled: Boolean? ->
        view.blurEnabled = enabled ?: true
      }

      Prop("autoUpdate") { view: BlurView, autoUpdate: Boolean? ->
        view.autoUpdate = autoUpdate ?: true
      }

      Prop("cornerRadius") { view: BlurView, radius: Float? ->
        val density = view.resources.displayMetrics.density
        val r = (radius ?: 0f) * density
        view.setCornerRadii(r, r, r, r)
      }

      Prop("cornerRadii") { view: BlurView, radii: CornerRadii? ->
        if (radii != null) {
          val density = view.resources.displayMetrics.density
          view.setCornerRadii(
            radii.topLeft * density,
            radii.topRight * density,
            radii.bottomRight * density,
            radii.bottomLeft * density
          )
        }
      }
    }

    View(GaussianBlurView::class) {
      Prop("blurRadius") { view: GaussianBlurView, radius: Float? ->
        view.blurRadius = radius ?: 0f
      }

      Prop("opaque") { view: GaussianBlurView, opaque: Boolean? ->
        view.opaque = opaque ?: false
      }

      OnViewDidUpdateProps { view: GaussianBlurView ->
        view.reapplyBlurEffect()
      }
    }

    View(ProgressiveBlurView::class) {
      GroupView<ProgressiveBlurView> {
        AddChildView { parent: ProgressiveBlurView, child: View, index: Int ->
          parent.addView(child, index + ProgressiveBlurView.RESERVED_CHILDREN)
        }
        GetChildCount { view: ProgressiveBlurView ->
          (view.childCount - ProgressiveBlurView.RESERVED_CHILDREN).coerceAtLeast(0)
        }
        GetChildViewAt { view: ProgressiveBlurView, index: Int ->
          view.getChildAt(index + ProgressiveBlurView.RESERVED_CHILDREN)
        }
        RemoveChildViewAt { view: ProgressiveBlurView, index: Int ->
          view.removeViewAt(index + ProgressiveBlurView.RESERVED_CHILDREN)
        }
        RemoveChildView { view: ProgressiveBlurView, child: View ->
          view.removeView(child)
        }
      }

      Prop("intensity") { view: ProgressiveBlurView, intensity: Float? ->
        view.intensity = intensity ?: ProgressiveBlurView.DEFAULT_INTENSITY
      }

      Prop("tint") { view: ProgressiveBlurView, tint: TintStyle? ->
        view.tint = tint ?: TintStyle.SYSTEM_ULTRA_THIN_MATERIAL
      }

      Prop("tintColor") { view: ProgressiveBlurView, tintColor: Color? ->
        view.blurTintColor = tintColor?.let { ColorCompat.toArgb(it) }
      }

      Prop("edge") { view: ProgressiveBlurView, edge: ProgressiveBlurEdge? ->
        view.edge = edge ?: ProgressiveBlurEdge.TOP
      }

      Prop("startOffset") { view: ProgressiveBlurView, offset: Float? ->
        view.startOffset = offset ?: 0f
      }

      Prop("scrollFallback") { view: ProgressiveBlurView, enabled: Boolean? ->
        view.scrollFallback = enabled ?: true
      }

      Prop("fallbackColor") { view: ProgressiveBlurView, color: Color? ->
        view.fallbackColor = color?.let { ColorCompat.toArgb(it) }
      }
    }
  }
}
