<script setup lang="ts">
defineProps<{
  lastChapterUrl: string
}>()
</script>

<template>
  <footer class="py-12 bg-base-300">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <!-- Logo and description -->
        <div class="text-center md:text-left">
          <div class="text-2xl font-bold mb-2">Bibleasy</div>
          <p class="text-base-content text-sm max-w-md">
            Projeto open source dedicado a tornar a leitura da Bíblia mais acessível e fácil para todos.
          </p>
        </div>

        <!-- Links -->
        <div class="flex flex-wrap justify-center gap-6 text-sm">
          <RouterLink :to="lastChapterUrl" class="hover:text-primary transition-colors">
            Bíblia
          </RouterLink>
          <RouterLink to="/help" class="hover:text-primary transition-colors">
            Central de Ajuda
          </RouterLink>
        </div>

        <!-- Social -->
        <SharedSocialLinks :icon-size="22" />
      </div>

      <div class="border-t border-base-content/10 mt-8 pt-8 text-center text-sm text-base-content">
        <p>Feito com ❤️ por Vinicius Cruz</p>
      </div>
    </div>
  </footer>
</template>
