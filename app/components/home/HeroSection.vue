<script setup lang="ts">
defineProps<{
  lastChapterUrl: string
}>()
</script>

<template>
  <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <!-- Background layers (separate from content so decorative elements are visible and clicks work) -->
    <div class="absolute inset-0 bg-base-100" aria-hidden="true" />
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden="true" />
    <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

    <div class="relative z-10 text-center px-4 py-16 max-w-5xl mx-auto">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
        <Icon icon="rocket" :size="16" />
        <span>100% Gratuito e Open Source</span>
      </div>

      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
        Leia a Bíblia de forma
        <br>
        <span class="text-primary">fácil</span>
        e
        <span class="text-primary">intuitiva</span>
      </h1>

      <p class="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
        Explore as Escrituras Sagradas com uma interface bonita, personalizável e fácil de usar.
        Múltiplas versões, busca instantânea e leitura em qualquer dispositivo.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <RouterLink
          :to="lastChapterUrl"
          class="btn btn-primary btn-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
        >
          <Icon icon="book_open" :size="22" />
          Começar a Ler
        </RouterLink>
        <a
          href="https://github.com/viniciusrvcruz/bibleasy-frontend"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline btn-lg"
        >
          <Icon icon="github" :size="22" />
          Repositório
        </a>
      </div>

      <!-- Highlights -->
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-base-content/60">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary" />
          <span>Sem cadastro necessário</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary" />
          <span>Funciona em qualquer dispositivo</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary" />
          <span>Múltiplas versões da Bíblia</span>
        </div>
      </div>
    </div>
  </section>
</template>
