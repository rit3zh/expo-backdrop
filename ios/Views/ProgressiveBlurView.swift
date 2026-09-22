import ExpoModulesCore
import UIKit

class ProgressiveBlurView: ExpoView {
  private static let fadeSamples = 5

  private static let blurScale: CGFloat = 1.25
  private static let blurRampShare: CGFloat = 0.6
  private static let coverageFadeDistance: CGFloat = 24
  private static let scrollViewCheckInterval: TimeInterval = 0.5
  private static let defaultWashOpacity: CGFloat = 0.85

  private let blurContainer = UIView()
  private let maskedBlur = UIView()
  private let effectView = BlurEffectView()
  private let blurMask = GradientView()
  private let tintWash = GradientView()
  private let fallbackGradient = GradientView()
  private let scrollMonitor = ScrollBlurMonitor()

  private var liveBlurAmount: CGFloat = 1
  private var scrollViewCheck: Timer?

  var intensity: Double = 25 {
    didSet {
      effectView.intensity = Double(blurStrength)
      updateGradients()
      updateLayerVisibility()
    }
  }

  var tint: TintStyle = .systemUltraThinMaterial {
    didSet { effectView.tint = tint }
  }

  var blurTintColor: UIColor? {
    didSet { updateGradients() }
  }

  var edge: ProgressiveBlurEdge = .top {
    didSet { setNeedsLayout() }
  }

  var startOffset: Double = 0 {
    didSet { setNeedsLayout() }
  }

  var scrollFallback: Bool = true {
    didSet {
      scrollMonitor.tracksSpeed = scrollFallback
      updateLayerVisibility()
    }
  }

  var fallbackColor: UIColor? {
    didSet { updateGradients() }
  }

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)

    blurContainer.isUserInteractionEnabled = false

    blurContainer.layer.allowsGroupOpacity = false
    effectView.tint = tint
    effectView.intensity = Double(blurStrength)
    maskedBlur.addSubview(effectView)
    maskedBlur.layer.mask = blurMask.layer
    blurContainer.addSubview(maskedBlur)
    tintWash.isHidden = true
    blurContainer.addSubview(tintWash)
    addSubview(blurContainer)

    fallbackGradient.isHidden = true
    addSubview(fallbackGradient)

    scrollMonitor.tracksSpeed = scrollFallback
    scrollMonitor.onScroll = { [weak self] in
      self?.updateLayerVisibility()
    }
    scrollMonitor.onContentChange = { [weak self] in
      self?.updateLayerVisibility()
    }
    scrollMonitor.onBlurAmountChange = { [weak self] amount in
      self?.liveBlurAmount = amount
      self?.updateLayerVisibility()
    }
  }

  deinit {
    scrollViewCheck?.invalidate()
  }

  override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
    insertSubview(childComponentView, at: index + 2)
  }

  override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
    childComponentView.removeFromSuperview()
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    blurContainer.frame = bounds
    maskedBlur.frame = bounds
    effectView.frame = bounds
    blurMask.frame = bounds
    tintWash.frame = bounds
    fallbackGradient.frame = bounds
    updateGradients()

    if scrollMonitor.scrollView == nil {
      attachScrollMonitor()
    }
    updateLayerVisibility()
  }

  override func didMoveToWindow() {
    super.didMoveToWindow()
    attachScrollMonitor()

    scrollViewCheck?.invalidate()
    scrollViewCheck = nil
    guard window != nil else { return }

    let timer = Timer(timeInterval: Self.scrollViewCheckInterval, repeats: true) { [weak self] _ in
      self?.reattachIfScrollViewLeft()
    }
    RunLoop.main.add(timer, forMode: .default)
    scrollViewCheck = timer
  }

  override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
    super.traitCollectionDidChange(previousTraitCollection)
    updateGradients()
  }

  private var fadeLength: CGFloat {
    1 - CGFloat(max(0, min(1, startOffset)))
  }

  private var strength: CGFloat {
    CGFloat(max(0, min(100, intensity)) / 100)
  }

  private var blurStrength: CGFloat {
    min(1, strength * Self.blurScale)
  }

  private func updateGradients() {
    let blurRising = Self.fade(from: 0, to: fadeLength * Self.blurRampShare, rising: true) + [(1, 1)]
    blurMask.update(edge: edge, color: .black, stops: blurRising)

    let rising = Self.fade(from: 0, to: fadeLength, rising: true) + [(1, 1)]

    let background = Self.backgroundColor(behind: self)

    let wash = (blurTintColor ?? background.withAlphaComponent(Self.defaultWashOpacity))
      .resolvedColor(with: traitCollection)
    tintWash.isHidden = wash.cgColor.alpha == 0
    tintWash.update(edge: edge, color: wash, stops: rising)

    let fallback = (fallbackColor ?? background).resolvedColor(with: traitCollection)
    let stops: [GradientStop] = rising.map { ($0.location, $0.alpha * strength) }
    fallbackGradient.update(edge: edge, color: fallback, stops: stops)
  }

  private static func fade(from start: CGFloat, to end: CGFloat, rising: Bool) -> [GradientStop] {
    (0...fadeSamples).map { sample in
      let t = CGFloat(sample) / CGFloat(fadeSamples)
      let eased = smoothstep(0, 1, t)
      return (start + (end - start) * t, rising ? eased : 1 - eased)
    }
  }

  private static func backgroundColor(behind view: UIView) -> UIColor {
    var ancestor = view.superview
    while let current = ancestor {
      if let color = current.backgroundColor, color.cgColor.alpha >= 1 {
        return color
      }
      ancestor = current.superview
    }
    #if os(tvOS)
      return view.window?.backgroundColor ?? .black
    #else
      return view.window?.backgroundColor ?? .systemBackground
    #endif
  }

  private func updateLayerVisibility() {
    let coverage = contentCoverage()
    let blurAmount = scrollFallback ? liveBlurAmount : 1

    let blurAlpha = blurAmount * coverage
    if blurContainer.alpha != blurAlpha {
      blurContainer.alpha = blurAlpha
    }
    let blurHidden = blurAlpha == 0 || strength == 0
    if blurContainer.isHidden != blurHidden {
      blurContainer.isHidden = blurHidden
    }

    let fallbackAlpha = (1 - blurAmount) * coverage
    if fallbackGradient.alpha != fallbackAlpha {
      fallbackGradient.alpha = fallbackAlpha
    }
    let fallbackHidden = fallbackAlpha == 0
    if fallbackGradient.isHidden != fallbackHidden {
      fallbackGradient.isHidden = fallbackHidden
    }
  }

  private func contentCoverage() -> CGFloat {
    guard let scrollView = scrollMonitor.scrollView else { return 1 }
    let inset = scrollView.adjustedContentInset
    let offset = scrollView.contentOffset
    let size = scrollView.contentSize
    let visible = scrollView.bounds.size

    let hiddenContent: CGFloat
    switch edge {
    case .top:
      hiddenContent = offset.y + inset.top
    case .bottom:
      hiddenContent = size.height + inset.bottom - (offset.y + visible.height)
    case .left:
      hiddenContent = offset.x + inset.left
    case .right:
      hiddenContent = size.width + inset.right - (offset.x + visible.width)
    }
    return smoothstep(0, Self.coverageFadeDistance, hiddenContent)
  }

  private func attachScrollMonitor() {
    guard window != nil else {
      scrollMonitor.stop()
      return
    }
    scrollMonitor.observe(findScrollViewBehind())
    updateGradients()
    updateLayerVisibility()
  }

  private func reattachIfScrollViewLeft() {
    guard let scrollView = scrollMonitor.scrollView, scrollView.window == nil else { return }
    scrollMonitor.stop()
    attachScrollMonitor()
  }

  private func findScrollViewBehind() -> UIScrollView? {
    let frameInWindow = convert(bounds, to: nil)
    var child: UIView = self

    while let container = child.superview {
      let index = container.subviews.firstIndex(of: child) ?? 0
      for sibling in container.subviews[..<index].reversed() {
        if let scrollView = Self.scrollView(in: sibling, overlapping: frameInWindow) {
          return scrollView
        }
      }
      child = container
    }
    return nil
  }

  private static func scrollView(in view: UIView, overlapping frame: CGRect) -> UIScrollView? {
    guard !view.isHidden, view.convert(view.bounds, to: nil).intersects(frame) else { return nil }
    if let scrollView = view as? UIScrollView {
      return scrollView
    }
    for subview in view.subviews.reversed() {
      if let scrollView = scrollView(in: subview, overlapping: frame) {
        return scrollView
      }
    }
    return nil
  }
}

private typealias GradientStop = (location: CGFloat, alpha: CGFloat)

private final class GradientView: UIView {
  override class var layerClass: AnyClass { CAGradientLayer.self }

  private var gradient: CAGradientLayer { layer as! CAGradientLayer }

  override init(frame: CGRect) {
    super.init(frame: frame)
    isUserInteractionEnabled = false
  }

  required init?(coder: NSCoder) { nil }

  func update(edge: ProgressiveBlurEdge, color: UIColor, stops: [GradientStop]) {
    gradient.colors = stops.map { color.withAlphaComponent(color.cgColor.alpha * $0.alpha).cgColor }
    gradient.locations = stops.map { NSNumber(value: Double($0.location)) }

    switch edge {
    case .top:
      gradient.startPoint = CGPoint(x: 0.5, y: 1)
      gradient.endPoint = CGPoint(x: 0.5, y: 0)
    case .bottom:
      gradient.startPoint = CGPoint(x: 0.5, y: 0)
      gradient.endPoint = CGPoint(x: 0.5, y: 1)
    case .left:
      gradient.startPoint = CGPoint(x: 1, y: 0.5)
      gradient.endPoint = CGPoint(x: 0, y: 0.5)
    case .right:
      gradient.startPoint = CGPoint(x: 0, y: 0.5)
      gradient.endPoint = CGPoint(x: 1, y: 0.5)
    }
  }
}
