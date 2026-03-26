export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  const themeColor = ref('#ffffff')

  function syncFromCss() {
    const colorBase = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-base-300')
      .trim()

    themeColor.value = colorBase || '#ffffff'
  }

  useHead({
    meta: [{ name: 'theme-color', content: themeColor }],
  })

  watch(
    () => colorMode.value,
    syncFromCss,
    { immediate: true }
  )
})
