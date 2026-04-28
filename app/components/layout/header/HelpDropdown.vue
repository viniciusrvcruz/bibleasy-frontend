<script setup lang="ts">
const popover = ref()
const supportModal = useSupportModal()

const toggle = (event: Event) => {
  popover.value.toggle(event)
}

const openSupport = () => {
  popover.value.hide()
  supportModal.open()
}

defineExpose({ toggle })
</script>

<template>
  <div>
    <Popover ref="popover">
      <div class="w-80 p-2 space-y-1.5 text-base-content">
        <button
          type="button"
          class="group flex items-start gap-3 p-3 rounded-lg border border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-content/25 cursor-pointer transition-colors w-full text-left"
          @click="openSupport"
        >
          <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-base-200 leading-none transition-colors group-hover:bg-base-300 [&_svg]:block">
            <Icon icon="message_circle" :size="18" class="text-base-content/80" />
          </div>
          <div class="min-w-0">
            <span class="font-medium text-sm">Enviar Feedback</span>
            <p class="text-xs text-base-content/60 mt-0.5 leading-relaxed">
              Reporte bugs, sugira melhorias ou peça ajuda diretamente para nossa equipe.
            </p>
          </div>
        </button>
        <RouterLink
          to="/help"
          class="group flex items-start gap-3 p-3 rounded-lg border border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-content/25 cursor-pointer transition-colors"
          @click="popover.hide()"
        >
          <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-base-200 leading-none transition-colors group-hover:bg-base-300 [&_svg]:block">
            <Icon icon="circle_question" :size="18" class="text-base-content/80" />
          </div>
          <div class="min-w-0">
            <span class="font-medium text-sm">Central de Ajuda</span>
            <p class="text-xs text-base-content/60 mt-0.5 leading-relaxed">
              Perguntas frequentes, guias e tutoriais sobre o uso da plataforma.
            </p>
          </div>
        </RouterLink>
      </div>
    </Popover>
  </div>
</template>
