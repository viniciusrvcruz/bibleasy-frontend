<script setup lang="ts">
const stats = [
  { value: '66', label: 'livros' },
  { value: '5+', label: 'traduções' },
  { value: '1.189', label: 'capítulos' },
  { value: '31.102', label: 'versículos' },
]
</script>

<template>
  <section aria-label="Escopo do texto bíblico">
    <div
      class="overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary to-primary/85 p-1 shadow-lg shadow-primary/20"
    >
      <div
        class="rounded-[0.85rem] bg-linear-to-b from-primary-content/8 to-transparent px-4 py-8 md:px-8 md:py-10"
      >
        <p class="text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary-content/70">
          Panorama
        </p>
        <div
          class="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4"
        >
          <div
            v-for="(item, i) in stats"
            :key="item.label"
            class="text-center md:border-s md:border-primary-content/15 md:ps-6 md:first:border-s-0 md:first:ps-0"
          >
            <p
              class="text-3xl font-bold tabular-nums tracking-tight text-primary-content md:text-4xl"
              :class="i === 1 ? 'md:translate-y-1' : i === 3 ? 'md:-translate-y-1' : ''"
            >
              {{ item.value }}
            </p>
            <p class="mt-1 text-xs font-medium uppercase tracking-wider text-primary-content/65">
              {{ item.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
