import ExpoModulesCore
import SwiftUI
import UIKit


class GaussianBlurView: ExpoView {
  
  private let contentContainer = UIView()

  private let model = BlurModel()
  private lazy var host: UIHostingController<BlurredContent> = {
    let controller = UIHostingController(
      rootView: BlurredContent(model: model, contentView: contentContainer)
    )
    controller.view.backgroundColor = .clear

    controller.safeAreaRegions = []
    controller.view.clipsToBounds = false
    controller.view.layer.masksToBounds = false
    return controller
  }()

  var blurRadius: Double = 0 {
    didSet {
      guard blurRadius != oldValue else { return }
      model.blurRadius = max(0, blurRadius)
    }
  }

  var opaqueBlur: Bool = false {
    didSet {
      guard opaqueBlur != oldValue else { return }
      model.opaque = opaqueBlur
    }
  }

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = false
    layer.masksToBounds = false
    host.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(host.view)
  }
  override func mountChildComponentView(_ childComponentView: UIView, index: Int) {
    contentContainer.insertSubview(childComponentView, at: index)
  }

  override func unmountChildComponentView(_ childComponentView: UIView, index: Int) {
    childComponentView.removeFromSuperview()
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    host.view.frame = bounds
  }

  override func didMoveToWindow() {
    super.didMoveToWindow()
    if window == nil {
      if host.parent != nil {
        host.willMove(toParent: nil)
        host.removeFromParent()
      }
      return
    }
    guard host.parent == nil, let parent = closestViewController() else { return }
    parent.addChild(host)
    host.didMove(toParent: parent)
  }

  private func closestViewController() -> UIViewController? {
    var responder: UIResponder? = self
    while let next = responder?.next {
      if let controller = next as? UIViewController {
        return controller
      }
      responder = next
    }
    return nil
  }
}

private class BlurModel: ObservableObject {
  @Published var blurRadius: CGFloat = 0
  @Published var opaque: Bool = false
}

private struct BlurredContent: View {
  @ObservedObject var model: BlurModel
  let contentView: UIView

  var body: some View {
    ContentBridge(contentView: contentView)
      .frame(maxWidth: .infinity, maxHeight: .infinity)
      .blur(radius: model.blurRadius, opaque: model.opaque)
  }
}

private struct ContentBridge: UIViewRepresentable {
  let contentView: UIView

  func makeUIView(context: Context) -> UIView { contentView }
  func updateUIView(_ uiView: UIView, context: Context) {}
}
