<script setup lang="ts">

const { lastChapterUrl } = useNavigateToBible()
</script>

<template>
  <RouterLink :to="lastChapterUrl">
    <slot />
  </RouterLink>
</template>
