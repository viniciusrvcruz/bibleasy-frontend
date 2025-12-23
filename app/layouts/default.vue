<script setup lang="ts">

const versionStore = useVersionStore()

const isLoading = ref(true)

versionStore.getVersions().finally(() => {
  isLoading.value = false
})

</script>

<template>
  <slot />
</template>