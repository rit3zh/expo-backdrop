import UIKit

final class ScrollBlurMonitor: NSObject {
  private static let slowSpeed: CGFloat = 500
  private static let fastSpeed: CGFloat = 1500
  private static let speedSmoothing: CGFloat = 0.1
  private static let fadeOutDuration: CGFloat = 0.08
  private static let fadeInDuration: CGFloat = 0.2
  private(set) weak var scrollView: UIScrollView?
  private(set) var blurAmount: CGFloat = 1

  var onScroll: (() -> Void)?

  var onContentChange: (() -> Void)?
  var onBlurAmountChange: ((CGFloat) -> Void)?

  var tracksSpeed = false {
    didSet {
      guard !tracksSpeed else { return }
      stopTrackingSpeed()
    }
  }

  private var offsetObservation: NSKeyValueObservation?
  private var sizeObservation: NSKeyValueObservation?
  private var displayLink: CADisplayLink?
  private var lastOffset = CGPoint.zero
  private var lastTimestamp: CFTimeInterval = 0
  private var speed: CGFloat = 0

  func observe(_ scrollView: UIScrollView?) {
    guard scrollView !== self.scrollView else { return }
    stop()
    self.scrollView = scrollView
    offsetObservation = scrollView?.observe(\.contentOffset, options: [.old]) { [weak self] _, change in
      self?.onScroll?()
      self?.scrollViewDidScroll(from: change.oldValue)
    }
    sizeObservation = scrollView?.observe(\.contentSize, options: [.old, .new]) { [weak self] _, change in

      guard change.oldValue != change.newValue else { return }
      self?.onContentChange?()
    }
  }

  func stop() {
    offsetObservation?.invalidate()
    offsetObservation = nil
    sizeObservation?.invalidate()
    sizeObservation = nil
    scrollView = nil
    stopTrackingSpeed()
  }

  private func stopTrackingSpeed() {
    displayLink?.invalidate()
    displayLink = nil
    speed = 0
    setBlurAmount(1)
  }

  private func scrollViewDidScroll(from oldOffset: CGPoint?) {
    guard tracksSpeed, displayLink == nil, let scrollView else { return }
    lastOffset = oldOffset ?? scrollView.contentOffset
    lastTimestamp = CACurrentMediaTime()
    let link = CADisplayLink(target: self, selector: #selector(step))
    link.add(to: .main, forMode: .common)
    displayLink = link
  }

  @objc private func step(_ link: CADisplayLink) {
    guard let scrollView else {
      stop()
      return
    }

    let elapsed = CGFloat(max(link.timestamp - lastTimestamp, 1.0 / 240))
    let offset = scrollView.contentOffset
    let instantSpeed = hypot(offset.x - lastOffset.x, offset.y - lastOffset.y) / elapsed
    lastOffset = offset
    lastTimestamp = link.timestamp

    speed += (instantSpeed - speed) * min(1, elapsed / Self.speedSmoothing)

    let target = 1 - smoothstep(Self.slowSpeed, Self.fastSpeed, speed)
    let duration = target < blurAmount ? Self.fadeOutDuration : Self.fadeInDuration
    var next = blurAmount + (target - blurAmount) * min(1, elapsed / duration)
    if abs(target - next) < 0.01 {
      next = target
    }
    setBlurAmount(next)

    if speed < 5 && blurAmount == 1 {
      speed = 0
      displayLink?.invalidate()
      displayLink = nil
    }
  }

  private func setBlurAmount(_ amount: CGFloat) {
    guard amount != blurAmount else { return }
    blurAmount = amount
    onBlurAmountChange?(amount)
  }
}

func smoothstep(_ edge0: CGFloat, _ edge1: CGFloat, _ x: CGFloat) -> CGFloat {
  let t = max(0, min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}
