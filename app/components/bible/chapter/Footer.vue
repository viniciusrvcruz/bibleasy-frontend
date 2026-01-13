<template>
  <footer class="pb-8 text-center text-sm text-base-content/70 max-w-4xl mx-auto">
    <p class="mb-3">
      Este é um projeto open source dedicado a tornar a leitura da Bíblia mais acessível e moderna.
    </p>
    <div class="mb-4 py-2 px-4 rounded-md inline-block">
      <p class="text-sm text-base-content/60 text-center">
        <Icon icon="info" :size="16" class="text-base-content/40 inline-block align-text-bottom mr-1" style="vertical-align: -0.125em;" />
        Encontrou algum problema de tradução ou erro no texto?
        <RouterLink
          to="/help#suggestions-bugs"
          class="underline font-medium transition-colors ml-1"
        >
          Reporte aqui
        </RouterLink>
      </p>
    </div>
    <SharedSocialLinks />
  </footer>
</template>

