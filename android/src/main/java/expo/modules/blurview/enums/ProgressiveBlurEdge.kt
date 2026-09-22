package expo.modules.blurview.enums

import expo.modules.kotlin.types.Enumerable

enum class ProgressiveBlurEdge(val value: String) : Enumerable {
  TOP("top"),
  BOTTOM("bottom"),
  LEFT("left"),
  RIGHT("right")
}
