import UIKit

final class BlurEffectView: UIVisualEffectView {
  var intensity: Double = 0.5 {
    didSet {
      intensity = max(0.01, min(1, intensity))
      if intensity != oldValue { applyEffect() }
    }
  }

  var tint: TintStyle = .default {
    didSet { visualEffect = UIBlurEffect(style: tint.toBlurEffectStyle()) }
  }

  private var visualEffect: UIVisualEffect = UIBlurEffect(style: TintStyle.default.toBlurEffectStyle()) {
    didSet { applyEffect() }
  }

  private var animator: UIViewPropertyAnimator?

  init() {
    super.init(effect: nil)
  }

  required init?(coder aDecoder: NSCoder) { nil }

  deinit {
    animator?.stopAnimation(true)
  }

  override func didMoveToWindow() {
    super.didMoveToWindow()
    applyEffect()
  }

  private func applyEffect() {
    guard window != nil else { return }

    if isDetoxPresent() {
      effect = intensity > 0 ? visualEffect : nil
      return
    }

    effect = nil
    animator?.stopAnimation(true)
    animator = UIViewPropertyAnimator(duration: 1, curve: .linear) { [unowned self] in
      self.effect = visualEffect
    }
    animator?.fractionComplete = CGFloat(intensity)
  }
}

private func isDetoxPresent() -> Bool {
  let args = ProcessInfo.processInfo.arguments
  return args.contains("-detoxServer") && args.contains("-detoxSessionId")
}
