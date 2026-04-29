<script setup lang="ts">
const supportModal = useSupportModal()
</script>

<template>
  <section id="suggestions-bugs" class="card bg-base-200 shadow-lg mb-8 scroll-mt-8">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">
        <Icon icon="edit" :size="28" />
        Sugestões e Relatórios de Bugs
      </h2>
      <div class="space-y-4">
        <p>
          Tem uma sugestão de melhoria ou encontrou um bug? Envie seu feedback diretamente pelo nosso formulário integrado.
          Sua opinião nos ajuda a tornar a aplicação melhor!
        </p>

        <div class="flex flex-col items-start gap-3">
          <div class="space-y-2 text-sm text-base-content/70">
            <p><strong>Quando usar:</strong> peça ajuda se travar em alguma tela ou não conseguir realizar alguma ação, reporte bugs ou envie sugestões de melhoria.</p>
            <p><strong>Dica:</strong> se for bug, explique o caminho que você fez antes do erro aparecer. Se for sugestão, diga o problema atual e como a mudança melhoraria o uso.</p>
          </div>

          <button class="btn btn-primary gap-2" @click="supportModal.open">
            <Icon icon="message_circle" :size="18" />
            Enviar Feedback
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
