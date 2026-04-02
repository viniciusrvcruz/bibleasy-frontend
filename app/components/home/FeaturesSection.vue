<template>
  <section class="py-14 bg-base-100">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <span class="text-primary font-semibold text-sm uppercase tracking-wider">Recursos</span>
        <h2 class="text-3xl md:text-4xl font-bold mt-2 mb-4">Tudo que você precisa</h2>
        <p class="text-lg text-base-content/60 max-w-2xl mx-auto">
          Uma plataforma completa para sua leitura bíblica diária
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <!-- Feature 1 -->
        <div class="p-6 rounded-2xl bg-base-200">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon icon="book_open" :size="28" />
          </div>
          <h3 class="text-xl font-bold mb-2">Navegação Intuitiva</h3>
          <p class="text-base-content/60">
            Encontre qualquer livro, capítulo ou versículo em segundos.
            Interface limpa e organizada para você focar na leitura.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="p-6 rounded-2xl bg-base-200">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon icon="compare" :size="28" />
          </div>
          <h3 class="text-xl font-bold mb-2">Múltiplas Versões</h3>
          <p class="text-base-content/60">
            Acesse diferentes traduções da Bíblia.
            Troque entre versões a qualquer momento.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="p-6 rounded-2xl bg-base-200">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon icon="palette" :size="28" />
          </div>
          <h3 class="text-xl font-bold mb-2">Personalização Total</h3>
          <p class="text-base-content/60">
            Escolha entre dezenas de temas e cores.
            Ajuste fonte e tamanho do texto ao seu gosto.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="p-6 rounded-2xl bg-base-200">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon icon="search" :size="28" />
          </div>
          <h3 class="text-xl font-bold mb-2">Busca Instantânea</h3>
          <p class="text-base-content/60">
            Encontre qualquer passagem pelo livro, capítulo e versículo.
            Digite o nome do livro e navegue em segundos.
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="p-6 rounded-2xl bg-base-200">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon icon="globe" :size="28" />
          </div>
          <h3 class="text-xl font-bold mb-2">Leia em Qualquer Lugar</h3>
          <p class="text-base-content/60">
            Funciona perfeitamente em celular, tablet ou computador.
            Leia a qualquer hora, em qualquer lugar.
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="p-6 rounded-2xl bg-base-200">
          <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Icon icon="history" :size="28" />
          </div>
          <h3 class="text-xl font-bold mb-2">Histórico de Leitura</h3>
          <p class="text-base-content/60">
            Continue de onde parou automaticamente.
            Acesse seu histórico de capítulos lidos recentemente.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
