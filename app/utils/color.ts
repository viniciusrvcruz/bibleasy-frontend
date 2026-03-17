const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{6})$/

/**
 * Validate if the string is a valid hex color (#RRGGBB).
 */
export function isValidHexColor(color: string): boolean {
  return HEX_COLOR_REGEX.test(color)
}

/**
 * Convert a hex color (#RRGGBB) to RGB components.
 */
function hexToRgb(hexColor: string): { r: number; g: number; b: number } | null {
  if (!isValidHexColor(hexColor)) return null

  const hex = hexColor.replace('#', '')

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null

  return { r, g, b }
}

/**
 * Return true if the background color is considered "dark"
 * using a simple luminance formula.
 */
export function isColorTooDark(hexColor: string): boolean {
  const rgb = hexToRgb(hexColor)

  if (!rgb) return false

  const { r, g, b } = rgb

  const luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255
  const threshold = 0.5

  return luma < threshold
}

/**
 * Return the text color class for better contrast on the background color.
 * Uses only the simple luma to decide between black or white.
 */
export function getContrastTextColor(hexColor: string): 'text-black' | 'text-white' | 'text-base-content' {
  if (!isValidHexColor(hexColor)) return 'text-base-content'

  return isColorTooDark(hexColor) ? 'text-white' : 'text-black'
}

/**
 * Return a lighter version of the original color, adding a factor to each channel.
 */
export function getLighterColor(color: string, factor: number): string | undefined {
  if (!isValidHexColor(color)) return

  const hex = color.replace('#', '')

  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return

  r = Math.min(255, r + factor)
  g = Math.min(255, g + factor)
  b = Math.min(255, b + factor)

  const newColor = (1 << 24) | (r << 16) | (g << 8) | b

  return `#${newColor.toString(16).slice(1)}`
}
