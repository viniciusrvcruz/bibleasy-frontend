<script setup lang="ts">
const popover = ref()
const supportModalRef = useTemplateRef('supportModalRef')

const toggle = (event: Event) => {
  popover.value.toggle(event)
}

const openSupportModal = () => {
  popover.value.hide()
  supportModalRef.value?.open()
}

defineExpose({ toggle })
</script>

<template>
  <div>
    <Popover ref="popover">
      <div class="w-72 p-2">
        <RouterLink
          to="/help"
          class="flex items-start gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
          @click="popover.hide()"
        >
          <div class="rounded-lg p-2 bg-primary/10 shrink-0">
            <Icon icon="circle_question" :size="18" class="text-primary" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-sm">Central de Ajuda</p>
            <p class="text-xs text-base-content/60 mt-0.5 leading-relaxed">
              Perguntas frequentes, guias e tutoriais sobre o uso da plataforma.
            </p>
          </div>
        </RouterLink>
        <button
          class="flex items-start gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors w-full text-left"
          @click="openSupportModal"
        >
          <div class="rounded-lg p-2 bg-secondary/10 shrink-0">
            <Icon icon="message_circle" :size="18" class="text-secondary" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-sm">Enviar Feedback</p>
            <p class="text-xs text-base-content/60 mt-0.5 leading-relaxed">
              Reporte bugs, sugira melhorias ou peça ajuda diretamente para nossa equipe.
            </p>
          </div>
        </button>
      </div>
    </Popover>

    <HelpSupportModal ref="supportModalRef" />
  </div>
</template>
