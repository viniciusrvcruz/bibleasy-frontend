<script setup lang="ts">
const versionStore = useVersionStore()

const versionCount = computed(() => versionStore.versions.length)

const stats = computed(() => [
  { value: String(versionCount.value || 0), label: 'versões' },
  { value: 'Dezenas', label: 'de temas' },
  { value: '100%', label: 'gratuito' },
  { value: 'Open', label: 'source' },
])
</script>

<template>
  <section
    class="relative mx-auto w-full max-w-6xl px-4 py-8 md:py-12"
    aria-label="Destaques do produto"
  >
    <div
      class="overflow-hidden rounded-2xl border border-base-300/70 bg-base-200/40 p-px shadow-sm shadow-base-300/25"
    >
      <div
        class="rounded-[0.85rem] bg-linear-to-b from-base-100 to-base-200/50 px-4 py-8 md:px-8 md:py-10"
      >
        <p class="text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-base-content/45">
          Panorama
        </p>
        <div
          class="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4"
        >
          <div
            v-for="item in stats"
            :key="item.label"
            class="text-center md:border-s md:border-base-300/60 md:ps-6 md:first:border-s-0 md:first:ps-0"
          >
            <p
              class="text-3xl font-bold tabular-nums tracking-tight text-base-content md:text-4xl"
            >
              {{ item.value }}
            </p>
            <p class="mt-1 text-xs font-medium uppercase tracking-wider text-base-content/55">
              {{ item.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
