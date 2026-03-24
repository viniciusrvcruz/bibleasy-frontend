export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()

  function getThemeColor() {
    if (!import.meta.client) return '#ffffff'

    const root = document.documentElement
    const styles = getComputedStyle(root)

    // DaisyUI usa --b1 como cor base
    const oklch = styles.getPropertyValue('--root-bg').trim()

    if (!oklch) return '#ffffff'

    // Converte OKLCH → RGB via browser
    const temp = document.createElement('div')
    temp.style.color = `oklch(${oklch})`
    document.body.appendChild(temp)

    const rgb = getComputedStyle(temp).color
    document.body.removeChild(temp)

    return rgb // já retorna tipo "rgb(255, 255, 255)"
  }

  function updateThemeColor() {
    const color = getThemeColor()

    let meta = document.querySelector('meta[name="theme-color"]')

    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }

    meta.setAttribute('content', color)
  }

  // inicial
  if (import.meta.client) {
    updateThemeColor()
  }

  // quando troca tema (daisyui / colorMode)
  watch(
    () => colorMode.value,
    () => {
      setTimeout(updateThemeColor, 50)
    }
  )
})