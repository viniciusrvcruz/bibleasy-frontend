const isFullscreen = ref(false)

export const useFullscreen = () => {
  const toggle = () => {
    isFullscreen.value = !isFullscreen.value
  }

  const enable = () => {
    isFullscreen.value = true
  }

  const disable = () => {
    isFullscreen.value = false
  }

  return {
    isFullscreen: readonly(isFullscreen),
    toggle,
    enable,
    disable,
  }
}
