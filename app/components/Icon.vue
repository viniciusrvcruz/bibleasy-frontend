<script setup lang="ts">

defineProps<{
  icon: keyof typeof ICON_MAP
  size?: number
}>()

const ICON_MAP = {
  circle_question: 'lucide:circle-question-mark',
  book: 'mdi:book-open-outline',
  document: 'mdi:file-document-outline',
  clock: 'mdi:clock-outline',
  edit: 'mdi:pencil',
  help: 'mdi:help-circle-outline',
  palette: 'mdi:palette-outline',
  menu: 'mdi:menu',
  user: 'lucide:user',
  book_marked: 'lucide:book-marked',
} as const

</script>

<template>
  <NuxtIcon :name="ICON_MAP[icon]" :size="size" />
</template>