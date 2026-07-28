package expo.modules.blurview.enums

import expo.modules.kotlin.types.Enumerable

enum class TintStyle(val value: String) : Enumerable {
  DEFAULT("default"),
  EXTRA_LIGHT("extraLight"),
  LIGHT("light"),
  DARK("dark"),
  REGULAR("regular"),
  PROMINENT("prominent"),
  SYSTEM_ULTRA_THIN_MATERIAL("systemUltraThinMaterial"),
  SYSTEM_THIN_MATERIAL("systemThinMaterial"),
  SYSTEM_MATERIAL("systemMaterial"),
  SYSTEM_THICK_MATERIAL("systemThickMaterial"),
  SYSTEM_CHROME_MATERIAL("systemChromeMaterial"),
  SYSTEM_ULTRA_THIN_MATERIAL_LIGHT("systemUltraThinMaterialLight"),
  SYSTEM_THIN_MATERIAL_LIGHT("systemThinMaterialLight"),
  SYSTEM_MATERIAL_LIGHT("systemMaterialLight"),
  SYSTEM_THICK_MATERIAL_LIGHT("systemThickMaterialLight"),
  SYSTEM_CHROME_MATERIAL_LIGHT("systemChromeMaterialLight"),
  SYSTEM_ULTRA_THIN_MATERIAL_DARK("systemUltraThinMaterialDark"),
  SYSTEM_THIN_MATERIAL_DARK("systemThinMaterialDark"),
  SYSTEM_MATERIAL_DARK("systemMaterialDark"),
  SYSTEM_THICK_MATERIAL_DARK("systemThickMaterialDark"),
  SYSTEM_CHROME_MATERIAL_DARK("systemChromeMaterialDark");

  fun toOverlayColor(intensity: Float): Int = when (this) {
    EXTRA_LIGHT,
    LIGHT,
    SYSTEM_MATERIAL_LIGHT,
    SYSTEM_ULTRA_THIN_MATERIAL_LIGHT,
    SYSTEM_THICK_MATERIAL_LIGHT -> LIGHT.colorInt(intensity)

    PROMINENT,
    DEFAULT,
    SYSTEM_MATERIAL -> DEFAULT.colorInt(intensity)

    DARK,
    SYSTEM_MATERIAL_DARK -> DARK.colorInt(intensity)

    else -> colorInt(intensity)
  }

  private fun colorInt(intensityPercent: Float): Int {
    val intensity = intensityPercent / 100f
    fun argb(opacity: Double, red: Int, green: Int, blue: Int): Int =
      ((255 * intensity * opacity).toInt() shl 24) + (red shl 16) + (green shl 8) + blue

    return when (this) {
      DARK -> argb(0.69, 25, 25, 25)
      LIGHT -> argb(0.78, 249, 249, 249)
      REGULAR -> argb(0.82, 179, 179, 179)
      SYSTEM_THIN_MATERIAL_LIGHT -> argb(0.78, 199, 199, 199)
      SYSTEM_THIN_MATERIAL -> argb(0.97, 199, 199, 199)
      SYSTEM_CHROME_MATERIAL -> argb(0.75, 255, 255, 255)
      SYSTEM_CHROME_MATERIAL_LIGHT -> argb(0.97, 255, 255, 255)
      SYSTEM_ULTRA_THIN_MATERIAL -> argb(0.44, 191, 191, 191)
      SYSTEM_THICK_MATERIAL -> argb(0.97, 153, 153, 153)
      SYSTEM_THICK_MATERIAL_DARK -> argb(0.9, 37, 37, 37)
      SYSTEM_THIN_MATERIAL_DARK -> argb(0.7, 37, 37, 37)
      SYSTEM_ULTRA_THIN_MATERIAL_DARK -> argb(0.55, 37, 37, 37)
      SYSTEM_CHROME_MATERIAL_DARK -> argb(0.75, 0, 0, 0)
      else -> argb(0.44, 255, 255, 255)
    }
  }
}
