<script setup lang="ts">
defineProps<{
  lastChapterUrl: string
}>()
</script>

<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-base-300/80 md:rounded-3xl"
  >
    <div
      class="absolute inset-0 bg-linear-to-br from-secondary/20 via-base-200/50 to-primary/15"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 opacity-[0.15]"
      style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 12px, currentColor 12px, currentColor 13px);"
      aria-hidden="true"
    />

    <div class="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
      <div class="max-w-md">
        <h2 class="text-2xl font-bold tracking-tight text-base-content md:text-3xl">
          Pronto para ler?
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-base-content/70 md:text-base">
          O projeto é aberto: código no GitHub, melhorias e ideias são bem-vindas.
        </p>
      </div>
      <div class="flex flex-wrap gap-3 md:justify-end">
        <RouterLink
          :to="lastChapterUrl"
          class="btn btn-primary gap-2 rounded-xl px-6 shadow-md"
        >
          <Icon icon="book_open" :size="16" />
          Ir para a Bíblia
        </RouterLink>
        <a
          href="https://github.com/viniciusrvcruz/bibleasy-frontend"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-ghost gap-2 rounded-xl border border-base-300 bg-base-100/80 backdrop-blur-sm"
        >
          <Icon icon="github" :size="16" />
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>
