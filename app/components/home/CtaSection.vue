<script setup lang="ts">
defineProps<{
  lastChapterUrl: string
}>()
</script>

<template>
  <section class="py-24 bg-base-100">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
        Pronto para começar sua jornada?
      </h2>
      <p class="text-xl text-base-content/70 mb-10 max-w-2xl mx-auto">
        Descubra uma nova forma de ler e explorar as Escrituras Sagradas.
      </p>
      <RouterLink
        :to="lastChapterUrl"
        class="btn btn-primary btn-lg"
      >
        <Icon icon="book_open" :size="22" />
        Começar a Ler Agora
      </RouterLink>
    </div>
  </section>
</template>
