import ExpoModulesCore
import UIKit


class BlurView: ExpoView {
  private let blurEffectView = BlurEffectView()
  private let tintOverlay = UIView()

  
  private static let reservedSubviewCount = 2

  private var cornerRadii = CornerRadiiValues()

  var intensity: Double = 50 {
    didSet { blurEffectView.intensity = intensity / 100 }
  }

  var tint: TintStyle = .default {
    didSet { blurEffectView.tint = tint }
  }

  var tintColor_: UIColor = .clear {
    didSet { tintOverlay.backgroundColor = tintColor_ }
  }

  var blurEnabled: Bool = true {
    didSet { blurEffectView.isHidden = !blurEnabled }
  }

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    clipsToBounds = true

    blurEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(blurEffectView)

    tintOverlay.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    tintOverlay.isUserInteractionEnabled = false
    tintOverlay.backgroundColor = .clear
    addSubview(tintOverlay)
  }
  override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
    insertSubview(childComponentView, at: index + Self.reservedSubviewCount)
  }

  override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
    childComponentView.removeFromSuperview()
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    blurEffectView.frame = bounds
    tintOverlay.frame = bounds
    applyCornerRadii()
  }


  func setCornerRadii(topLeft: CGFloat, topRight: CGFloat, bottomRight: CGFloat, bottomLeft: CGFloat) {
    cornerRadii = CornerRadiiValues(
      topLeft: max(0, topLeft),
      topRight: max(0, topRight),
      bottomRight: max(0, bottomRight),
      bottomLeft: max(0, bottomLeft)
    )
    applyCornerRadii()
  }

  private func applyCornerRadii() {
    if cornerRadii.isUniform {
      layer.mask = nil
      layer.cornerCurve = .continuous
      layer.cornerRadius = cornerRadii.topLeft
      return
    }

    layer.cornerRadius = 0
    guard bounds.width > 0, bounds.height > 0 else { return }

    let mask = CAShapeLayer()
    mask.path = cornerRadii.path(in: bounds).cgPath
    layer.mask = mask
  }
}

