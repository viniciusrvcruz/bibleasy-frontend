<template>
  <section id="suggestions-bugs" class="card bg-base-200 shadow-lg mb-8 scroll-mt-8">
    <div class="card-body">
      <h2 class="card-title text-2xl mb-4">
        <Icon icon="edit" :size="28" />
        Sugestões e Relatórios de Bugs
      </h2>
      <div class="space-y-4">
        <p>
          Tem uma sugestão de melhoria ou encontrou um bug? Use o formulário abaixo para nos enviar seu feedback.
          Sua opinião nos ajuda a tornar a aplicação melhor!
        </p>
        
        <div class="border-2 border-dashed border-base-300 rounded-lg p-4 bg-base-100">
          <p class="text-sm text-base-content/70 mb-4 text-center">
            O formulário será exibido aqui
          </p>
          <!-- Placeholder for iframe - Replace src with your actual form URL -->
          <div class="w-full" style="min-height: 600px;">
            <iframe
              src=""
              class="w-full h-full min-h-[600px] border-0 rounded-lg"
              title="Formulário de Feedback"
              loading="lazy"
            />
          </div>
          <p class="text-xs text-base-content/60 mt-4 text-center">
            Substitua o atributo <code>src</code> vazio acima pela URL do seu formulário iframe
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

