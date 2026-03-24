export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()

  const themeColor = computed(() => {
    const computedStyle = import.meta.client ? getComputedStyle(document.documentElement) : null
    if (!computedStyle) return '#ffffff'
    
    const b1 = computedStyle.getPropertyValue('--b1').trim()
    if (!b1) return '#ffffff'
    
    // Parse oklch format: "lightness chroma hue"
    const values = b1.split(/\s+/)
    const l = parseFloat(values[0] || '0') / 100
    const c = parseFloat(values[1] || '0')
    const h = parseFloat(values[2] || '0')
    
    // Convert oklch to rgb
    const a = c * Math.cos(h * Math.PI / 180)
    const b = c * Math.sin(h * Math.PI / 180)
    
    let r = l + 0.3963377774 * a + 0.2158037573 * b
    let g = l - 0.1055613458 * a - 0.0638541728 * b
    let bl = l - 0.0894841775 * a - 1.2914855480 * b
    
    r = Math.max(0, Math.min(1, r))
    g = Math.max(0, Math.min(1, g))
    bl = Math.max(0, Math.min(1, bl))
    
    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(bl)}`
  })

  useHead({
    meta: [
      {
        name: 'theme-color',
        content: themeColor
      }
    ]
  })

  // Force update on theme change
  watch(() => colorMode.value, () => {
    if (import.meta.client) {
      setTimeout(() => {
        themeColor.value
      }, 100)
    }
  })
})
