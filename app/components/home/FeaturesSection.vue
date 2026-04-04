<script setup lang="ts">
const features = [
  { icon: 'globe' as const, title: 'Várias traduções', desc: 'Troque de versão quando quiser, sem sair da página.' },
  { icon: 'palette' as const, title: 'Aparência', desc: 'Tema claro ou escuro, fonte e tamanho para leitura longa.' },
  { icon: 'search' as const, title: 'Busca', desc: 'Atalho por teclado para abrir a pesquisa e ir ao capítulo.' },
  { icon: 'smartphone' as const, title: 'Qualquer tela', desc: 'Do celular ao monitor — o leitor acompanha.' },
  { icon: 'zap' as const, title: 'Sem conta', desc: 'Nada de login para abrir e ler.' },
  { icon: 'book_open' as const, title: 'Navegação integrada', desc: 'Capítulos e livros no mesmo fluxo de leitura.' },
]
</script>

<template>
  <section>
    <div class="lg:flex lg:gap-16">
      <div class="lg:sticky lg:top-28 lg:max-w-xs lg:self-start">
        <h2 class="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Recursos
        </h2>
        <p class="mt-3 text-2xl font-semibold leading-tight text-base-content md:text-3xl">
          O leitor em seis ideias
        </p>
        <p class="mt-4 text-sm leading-relaxed text-base-content/60">
          Lista alternada abaixo: um respiro visual entre um bloco e outro.
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
