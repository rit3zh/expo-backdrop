import ExpoModulesCore
import UIKit

public enum TintStyle: String, Enumerable {
  case `default`
  case extraLight
  case light
  case dark
  case regular
  case prominent
  case systemUltraThinMaterial
  case systemThinMaterial
  case systemMaterial
  case systemThickMaterial
  case systemChromeMaterial
  case systemUltraThinMaterialLight
  case systemThinMaterialLight
  case systemMaterialLight
  case systemThickMaterialLight
  case systemChromeMaterialLight
  case systemUltraThinMaterialDark
  case systemThinMaterialDark
  case systemMaterialDark
  case systemThickMaterialDark
  case systemChromeMaterialDark

  func toBlurEffectStyle() -> UIBlurEffect.Style {
    #if os(tvOS)
      switch self {
      case .default, .regular, .systemUltraThinMaterial, .systemThinMaterial, .systemMaterial,
           .systemThickMaterial, .systemChromeMaterial:
        return .regular
      case .extraLight:
        return .extraLight
      case .light, .systemUltraThinMaterialLight, .systemThinMaterialLight, .systemMaterialLight,
           .systemThickMaterialLight, .systemChromeMaterialLight:
        return .light
      case .dark, .systemUltraThinMaterialDark, .systemThinMaterialDark, .systemMaterialDark,
           .systemThickMaterialDark, .systemChromeMaterialDark:
        return .dark
      case .prominent:
        return .prominent
      }
    #else
      switch self {
      case .default: return .regular
      case .extraLight: return .extraLight
      case .light: return .light
      case .dark: return .dark
      case .regular: return .regular
      case .prominent: return .prominent
      case .systemUltraThinMaterial: return .systemUltraThinMaterial
      case .systemThinMaterial: return .systemThinMaterial
      case .systemMaterial: return .systemMaterial
      case .systemThickMaterial: return .systemThickMaterial
      case .systemChromeMaterial: return .systemChromeMaterial
      case .systemUltraThinMaterialLight: return .systemUltraThinMaterialLight
      case .systemThinMaterialLight: return .systemThinMaterialLight
      case .systemMaterialLight: return .systemMaterialLight
      case .systemThickMaterialLight: return .systemThickMaterialLight
      case .systemChromeMaterialLight: return .systemChromeMaterialLight
      case .systemUltraThinMaterialDark: return .systemUltraThinMaterialDark
      case .systemThinMaterialDark: return .systemThinMaterialDark
      case .systemMaterialDark: return .systemMaterialDark
      case .systemThickMaterialDark: return .systemThickMaterialDark
      case .systemChromeMaterialDark: return .systemChromeMaterialDark
      }
    #endif
  }
}
