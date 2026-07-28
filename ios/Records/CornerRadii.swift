import ExpoModulesCore
import UIKit


struct CornerRadii: Record {
  @Field var topLeft: Double = 0
  @Field var topRight: Double = 0
  @Field var bottomRight: Double = 0
  @Field var bottomLeft: Double = 0
}

struct CornerRadiiValues {
  var topLeft: CGFloat = 0
  var topRight: CGFloat = 0
  var bottomRight: CGFloat = 0
  var bottomLeft: CGFloat = 0

  var isUniform: Bool {
    topLeft == topRight && topRight == bottomRight && bottomRight == bottomLeft
  }

  func path(in rect: CGRect) -> UIBezierPath {
    let limit = min(rect.width, rect.height) / 2
    let tl = min(topLeft, limit)
    let tr = min(topRight, limit)
    let br = min(bottomRight, limit)
    let bl = min(bottomLeft, limit)

    let path = UIBezierPath()
    path.move(to: CGPoint(x: rect.minX + tl, y: rect.minY))
    path.addLine(to: CGPoint(x: rect.maxX - tr, y: rect.minY))
    path.addArc(
      withCenter: CGPoint(x: rect.maxX - tr, y: rect.minY + tr),
      radius: tr, startAngle: -.pi / 2, endAngle: 0, clockwise: true
    )
    path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY - br))
    path.addArc(
      withCenter: CGPoint(x: rect.maxX - br, y: rect.maxY - br),
      radius: br, startAngle: 0, endAngle: .pi / 2, clockwise: true
    )
    path.addLine(to: CGPoint(x: rect.minX + bl, y: rect.maxY))
    path.addArc(
      withCenter: CGPoint(x: rect.minX + bl, y: rect.maxY - bl),
      radius: bl, startAngle: .pi / 2, endAngle: .pi, clockwise: true
    )
    path.addLine(to: CGPoint(x: rect.minX, y: rect.minY + tl))
    path.addArc(
      withCenter: CGPoint(x: rect.minX + tl, y: rect.minY + tl),
      radius: tl, startAngle: .pi, endAngle: 3 * .pi / 2, clockwise: true
    )
    path.close()
    return path
  }
}
