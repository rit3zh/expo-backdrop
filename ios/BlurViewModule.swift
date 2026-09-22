import ExpoModulesCore

public class BlurViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("BlurView")

    View(BlurView.self) {
      Prop("intensity") { (view: BlurView, intensity: Double?) in
        view.intensity = intensity ?? 50
      }

      Prop("tint") { (view: BlurView, tint: TintStyle?) in
        view.tint = tint ?? .default
      }

      Prop("tintColor") { (view: BlurView, tintColor: UIColor?) in
        view.tintColor_ = tintColor ?? .clear
      }

      Prop("blurEnabled") { (view: BlurView, enabled: Bool?) in
        view.blurEnabled = enabled ?? true
      }

      Prop("cornerRadius") { (view: BlurView, radius: Double?) in
        let r = CGFloat(radius ?? 0)
        view.setCornerRadii(topLeft: r, topRight: r, bottomRight: r, bottomLeft: r)
      }

      Prop("cornerRadii") { (view: BlurView, radii: CornerRadii?) in
        guard let radii else { return }
        view.setCornerRadii(
          topLeft: CGFloat(radii.topLeft),
          topRight: CGFloat(radii.topRight),
          bottomRight: CGFloat(radii.bottomRight),
          bottomLeft: CGFloat(radii.bottomLeft)
        )
      }
      Prop("blurRadius") { (_: BlurView, _: Double?) in }
      Prop("blurReductionFactor") { (_: BlurView, _: Double?) in }
      Prop("downsampleFactor") { (_: BlurView, _: Double?) in }
      Prop("blurRounds") { (_: BlurView, _: Int?) in }
      Prop("autoUpdate") { (_: BlurView, _: Bool?) in }
    }

    View(GaussianBlurView.self) {
      Prop("blurRadius") { (view: GaussianBlurView, radius: Double?) in
        view.blurRadius = radius ?? 0
      }

      Prop("opaque") { (view: GaussianBlurView, opaque: Bool?) in
        view.opaqueBlur = opaque ?? false
      }
    }

    View(ProgressiveBlurView.self) {
      Prop("intensity") { (view: ProgressiveBlurView, intensity: Double?) in
        view.intensity = intensity ?? 50
      }

      Prop("tint") { (view: ProgressiveBlurView, tint: TintStyle?) in
        view.tint = tint ?? .systemUltraThinMaterial
      }

      Prop("tintColor") { (view: ProgressiveBlurView, tintColor: UIColor?) in
        view.blurTintColor = tintColor
      }

      Prop("edge") { (view: ProgressiveBlurView, edge: ProgressiveBlurEdge?) in
        view.edge = edge ?? .top
      }

      Prop("startOffset") { (view: ProgressiveBlurView, offset: Double?) in
        view.startOffset = offset ?? 0
      }

      Prop("scrollFallback") { (view: ProgressiveBlurView, enabled: Bool?) in
        view.scrollFallback = enabled ?? true
      }

      Prop("fallbackColor") { (view: ProgressiveBlurView, color: UIColor?) in
        view.fallbackColor = color
      }
    }
  }
}
