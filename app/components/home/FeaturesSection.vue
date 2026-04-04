<script setup lang="ts">
const features = [
  { icon: 'book_open' as const, title: 'Navegação Intuitiva', desc: 'Encontre qualquer livro, capítulo ou versículo em segundos. Interface limpa e organizada para você focar na leitura.' },
  { icon: 'compare' as const, title: 'Múltiplas Versões', desc: 'Acesse diferentes traduções da Bíblia. Troque entre versões a qualquer momento.' },
  { icon: 'palette' as const, title: 'Personalização Total', desc: 'Escolha entre dezenas de temas e cores. Ajuste fonte e tamanho do texto ao seu gosto.' },
  { icon: 'search' as const, title: 'Busca Instantânea', desc: 'Encontre qualquer passagem pelo livro, capítulo e versículo. Digite o nome do livro e navegue em segundos.' },
  { icon: 'globe' as const, title: 'Leia em Qualquer Lugar', desc: 'Funciona perfeitamente em celular, tablet ou computador. Leia a qualquer hora, em qualquer lugar.' },
  { icon: 'history' as const, title: 'Histórico de Leitura', desc: 'Continue de onde parou automaticamente. Acesse seu histórico de capítulos lidos recentemente.' },
]
</script>

<template>
  <section class="relative mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
    <div class="lg:flex lg:gap-16">
      <div class="lg:sticky lg:top-28 lg:max-w-xs lg:self-start">
        <h2 class="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Recursos
        </h2>
        <p class="mt-3 text-2xl font-semibold leading-tight text-base-content md:text-3xl">
          Tudo que você precisa
        </p>
        <p class="mt-2 text-sm leading-relaxed text-base-content/60 lg:mt-4">
          Uma plataforma completa para sua leitura bíblica diária.
        </p>
      </div>

      <ul class="mt-10 flex min-w-0 flex-1 flex-col gap-3 lg:mt-0">
        <li
          v-for="(feat, i) in features"
          :key="feat.title"
          class="flex gap-4 rounded-2xl border border-transparent px-4 py-5 transition-colors md:gap-5 md:px-5 md:py-6"
          :class="i % 2 === 0 ? 'bg-base-200/70 md:ms-0 md:me-8' : 'bg-base-100 md:ms-8 md:me-0 border-base-300/80'"
        >
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-base-100 text-primary shadow-sm ring-1 ring-base-300/60 md:size-12"
            :class="i % 2 === 1 ? 'bg-primary/10 ring-primary/20' : ''"
          >
            <Icon :icon="feat.icon" :size="20" />
          </div>
          <div class="min-w-0 pt-0.5">
            <h3 class="font-semibold text-base-content">
              {{ feat.title }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-base-content/65">
              {{ feat.desc }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
