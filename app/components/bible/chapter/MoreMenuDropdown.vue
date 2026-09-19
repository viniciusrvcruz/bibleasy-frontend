<script setup lang="ts">
import { useFullscreen } from '~/composables/bible/useBibleFullscreen'
import { useHideOnScroll } from '~/composables/bible/useHideOnScroll'

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()
const { enabled: hideOnScrollEnabled } = useHideOnScroll()

const fullscreenLabel = computed(() =>
  isFullscreen.value ? 'Sair da tela cheia' : 'Tela cheia',
)

const closePopover = () => {
  if (!import.meta.client) return
  document.getElementById('chapter-more-popover')?.hidePopover()
}

const onFullscreenClick = () => {
  toggleFullscreen()
  closePopover()
}
</script>

<template>
  <div>
    <button
      v-tooltip.bottom="'Mais opções'"
      type="button"
      class="btn btn-sm"
      aria-label="Mais opções"
      aria-haspopup="menu"
      popovertarget="chapter-more-popover"
      :style="{ anchorName: '--chapter-more-anchor' }"
    >
      <Icon icon="more_horizontal" :size="20" />
      <span class="sr-only">Mais opções</span>
    </button>

    <ul
      id="chapter-more-popover"
      popover="auto"
      role="menu"
      class="menu dropdown bg-base-300 rounded-box w-60 p-2 shadow-lg text-base-content m-0 top-0.75!"
      :style="{ positionAnchor: '--chapter-more-anchor', inset: 'auto', positionArea: 'bottom' }"
    >
      <li role="none">
        <button
          type="button"
          role="menuitem"
          class="gap-2"
          :aria-label="fullscreenLabel"
          @click="onFullscreenClick"
        >
          <Icon :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'" :size="18" />
          {{ fullscreenLabel }}
        </button>
      </li>

      <li role="none">
        <label class="gap-2">
          <input
            v-model="hideOnScrollEnabled"
            type="checkbox"
            class="toggle toggle-sm toggle-primary"
            role="menuitemcheckbox"
            aria-label="Ocultar menus ao rolar"
          >
          Ocultar menus ao rolar
        </label>
      </li>
    </ul>
  </div>
</template>
