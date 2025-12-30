<script setup lang="ts">
import { verseHistoryArraySchema } from '~/types/history/VerseHistory.type'
import type { VerseHistory } from '~/types/history/VerseHistory.type'

export type { VerseHistory }

const isOpen = ref(false)
const verseHistory = ref<VerseHistory[]>([])

const loadHistory = () => {
  if (import.meta.client) {
    const stored = localStorage.getItem('verse-history')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const result = verseHistoryArraySchema.safeParse(parsed)
        
        if (result.success) {
          verseHistory.value = result.data
        } else {
          console.error('Invalid verse history data', result.error)
          localStorage.removeItem('verse-history')
        }
      } catch (e) {
        console.error('Failed to parse verse history', e)
        localStorage.removeItem('verse-history')
      }
    }
  }
}

const addToHistory = (item: VerseHistory) => {
  if (!import.meta.client) return
  
  const existing = verseHistory.value.findIndex(
    (h) => h.book === item.book && h.chapter === item.chapter && h.verse === item.verse
  )
  
  if (existing !== -1) {
    verseHistory.value.splice(existing, 1)
  }
  
  verseHistory.value.unshift(item)
  
  if (verseHistory.value.length > 30) {
    verseHistory.value = verseHistory.value.slice(0, 30)
  }
  
  localStorage.setItem('verse-history', JSON.stringify(verseHistory.value))
}

const open = () => {
  loadHistory()
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

onMounted(() => {
  loadHistory()
})

const emit = defineEmits<{
  navigate: [item: VerseHistory]
}>()

const navigateToVerse = (item: VerseHistory) => {
  emit('navigate', item)
  close()
}

const clearHistory = () => {
  verseHistory.value = []
  if (import.meta.client) {
    localStorage.removeItem('verse-history')
  }
}

defineExpose({
  addToHistory,
  open
})
</script>

<template>
  <input type="checkbox" id="history_modal" class="modal-toggle" :checked="isOpen" @change="close" />
  <div class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-2xl sm:rounded-lg history-modal-box">
      <!-- Header com botão de fechar -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">Histórico de Versículos</h3>
        <button 
          class="btn btn-sm btn-ghost btn-circle"
          @click="close"
          v-tooltip="'Fechar'"
        >
          <Icon icon="close" :size="20" />
        </button>
      </div>
      
      <!-- Estado vazio -->
      <div v-if="verseHistory.length === 0" class="text-center py-8 text-base-content/60">
        <Icon icon="history" :size="48" class="mx-auto mb-2 opacity-50" />
        <p>Nenhum versículo no histórico ainda.</p>
        <p class="text-sm mt-1">Clique em versículos para adicionar ao histórico.</p>
      </div>
      
      <!-- Lista de histórico -->
      <div v-else class="space-y-2 max-h-96 overflow-y-auto">
        <button
          v-for="(item, index) in verseHistory"
          :key="index"
          class="w-full text-left p-3 rounded-lg hover:bg-base-200 transition-colors flex items-center gap-3 border border-base-300"
          @click="navigateToVerse(item)"
        >
          <div class="flex-1">
            <div class="font-semibold">
              {{ item.bookName }} {{ item.chapter }}:{{ item.verse }}
            </div>
            <div class="text-xs text-base-content/60 mt-1">
              {{ new Date(item.timestamp).toLocaleString('pt-BR') }}
            </div>
          </div>
          <Icon icon="chevron_right" :size="20" class="text-base-content/40 self-center" />
        </button>
      </div>
      
      <!-- Ação de limpar -->
      <div v-if="verseHistory.length > 0" class="mt-4 pt-4 border-t border-base-300">
        <button 
          class="btn btn-ghost btn-sm w-full"
          @click="clearHistory"
        >
          Limpar Histórico
        </button>
      </div>
    </div>
    <label class="modal-backdrop" for="history_modal">Fechar</label>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .history-modal-box {
    max-width: 100%;
    width: 100%;
    height: 100vh;
    margin: 0;
    border-radius: 0 !important;
  }
}
</style>

