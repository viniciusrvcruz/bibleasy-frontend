<script setup lang="ts">
import type { Version } from '~/types/version/Version.type'

const versionStore = useVersionStore()

const { data: versions } = await useApiFetch<Version[]>('versions')

if (versions.value?.length) {
  versionStore.setVersions(versions.value)
}

</script>

<template>
  <slot />
</template>