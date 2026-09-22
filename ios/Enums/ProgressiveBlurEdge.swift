import ExpoModulesCore

enum ProgressiveBlurEdge: String, Enumerable {
  case top
  case bottom
  case left
  case right

  var isVertical: Bool { self == .top || self == .bottom }
}
