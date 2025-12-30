<script setup lang="ts">
import type { Version } from '~/types/version/Version.type'

const isOpen = defineModel<boolean>('isOpen', { default: false })

const versionStore = useVersionStore()
const versions = ref<Version[]>([])
const versionSearchQuery = ref('')
const selectedLanguage = ref<'all' | 'pt_br' | 'en'>('all')

const filteredVersions = computed(() => {
  let result = versions.value
  
  if (selectedLanguage.value !== 'all') {
    result = result.filter(v => v.language === selectedLanguage.value)
  }
  
  if (versionSearchQuery.value) {
    const query = versionSearchQuery.value.toLowerCase()
    result = result.filter(v => 
      v.name.toLowerCase().includes(query) || 
      v.full_name.toLowerCase().includes(query)
    )
  }
  
  return result
})

const emit = defineEmits<{
  select: [version: Version]
}>()

const loadVersions = async () => {
  if (versions.value.length === 0) {
    const { data } = await useApiFetch<Version[]>('versions')
    if (data.value) {
      versions.value = data.value
    }
  }
}

watch(isOpen, async (newValue) => {
  if (newValue) {
    await loadVersions()
  }
})

const selectVersion = (version: Version) => {
  emit('select', version)
  isOpen.value = false
}

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <input type="checkbox" id="version_modal" class="modal-toggle" v-model="isOpen" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-3xl sm:rounded-lg version-modal-box">
      <!-- Header com botão de fechar -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">Selecionar Versão</h3>
        <button 
          class="btn btn-sm btn-ghost btn-circle"
          @click="close"
          v-tooltip="'Fechar'"
        >
          <Icon icon="close" :size="20" />
        </button>
      </div>
      
      <!-- Versão Atual -->
      <div v-if="versionStore.currentVersion" class="alert mb-4">
        <div>
          <div class="font-semibold">Versão Atual</div>
          <div class="text-sm">
            {{ versionStore.currentVersion.name }} - {{ versionStore.currentVersion.full_name }}
          </div>
        </div>
      </div>
      
      <!-- Filtros -->
      <div class="mb-4 space-y-3">
        <div class="form-control">
          <input
            v-model="versionSearchQuery"
            type="text"
            placeholder="Buscar versão..."
            class="input input-bordered w-full"
          />
        </div>
        
        <div class="flex gap-2">
          <button
            class="btn btn-sm"
            :class="{ 'btn-primary': selectedLanguage === 'all' }"
            @click="selectedLanguage = 'all'"
          >
            Todos
          </button>
          <button
            class="btn btn-sm"
            :class="{ 'btn-primary': selectedLanguage === 'pt_br' }"
            @click="selectedLanguage = 'pt_br'"
          >
            Português
          </button>
          <button
            class="btn btn-sm"
            :class="{ 'btn-primary': selectedLanguage === 'en' }"
            @click="selectedLanguage = 'en'"
          >
            English
          </button>
        </div>
      </div>
      
      <!-- Lista de Versões -->
      <div class="space-y-2 max-h-96 overflow-y-auto">
        <button
          v-for="version in filteredVersions"
          :key="version.id"
          class="w-full text-left p-3 rounded-lg hover:bg-base-200 transition-colors border border-base-300"
          :class="{
            'bg-primary/10 border-primary': versionStore.currentVersion?.id === version.id
          }"
          @click="selectVersion(version)"
        >
          <div class="font-semibold">{{ version.name }}</div>
          <div class="text-sm text-base-content/70">{{ version.full_name }}</div>
          <div class="text-xs text-base-content/50 mt-1">
            {{ version.language === 'pt_br' ? 'Português' : 'English' }}
          </div>
        </button>
      </div>
    </div>
    <label class="modal-backdrop" for="version_modal">Fechar</label>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .version-modal-box {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    margin: 0;
    border-radius: 0 !important;
  }
}
</style>

