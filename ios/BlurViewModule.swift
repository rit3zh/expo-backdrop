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
  }
}
