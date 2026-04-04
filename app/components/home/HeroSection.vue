<script setup lang="ts">
import { BookAbbreviation } from '~/utils/bible/book'

defineProps<{
  lastChapterUrl: string
}>()

const { getChapterUrl } = useNavigateToBible()
const exploreBooksUrl = computed(() => getChapterUrl(BookAbbreviation.gen, 1))
</script>

<template>
  <section
    class="relative overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-[0_24px_80px_-24px_oklch(0.35_0.05_260/0.25)] md:rounded-3xl"
  >
    <!-- camadas de cor: profundidade sem ser só um gradiente chapado -->
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-secondary/14"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -end-24 -top-24 size-[min(420px,90vw)] rounded-full bg-primary/20 blur-3xl"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -bottom-32 -start-16 size-[min(340px,70vw)] rounded-full bg-secondary/15 blur-3xl"
      aria-hidden="true"
    />
    <!-- grade diagonal suave -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
      style="background-image: linear-gradient(135deg, currentColor 1px, transparent 1px); background-size: 20px 20px;"
      aria-hidden="true"
    />

    <div class="relative grid gap-10 p-6 md:grid-cols-12 md:gap-8 md:p-10 lg:p-12">
      <div class="md:col-span-7 lg:col-span-6">
        <p class="inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-100/80 px-3 py-1 text-xs font-medium text-base-content/65 backdrop-blur-sm">
          <span class="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          Bíblia online · sem cadastro
        </p>

        <h1 class="mt-6 text-[2rem] font-bold leading-[1.08] tracking-tight text-base-content sm:text-4xl md:text-5xl">
          Escrituras com
          <span class="relative inline-block">
            <span class="relative z-10 font-serif italic text-primary">clareza</span>
            <span
              class="absolute -inset-x-1 -bottom-1 z-0 h-3 skew-x-[-8deg] bg-secondary/25"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p class="mt-5 max-w-lg text-base leading-relaxed text-base-content/70 md:text-lg">
          Traduções à escolha, tema e tipografia ajustáveis, e busca rápida — tudo no leitor, sem distrações desnecessárias.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink
            :to="lastChapterUrl"
            class="btn btn-primary gap-2 rounded-xl px-6 shadow-lg shadow-primary/20"
          >
            <Icon icon="book_open" :size="16" />
            Abrir a Bíblia
          </RouterLink>
          <RouterLink
            :to="exploreBooksUrl"
            class="btn btn-ghost gap-2 rounded-xl border border-base-300 bg-base-100/90 backdrop-blur-sm"
          >
            Começar pelo Gênesis
            <Icon icon="arrow_right" :size="16" />
          </RouterLink>
        </div>
      </div>

      <!-- coluna visual: cartões “flutuantes” com função (dicas), não só enfeite -->
      <div class="relative md:col-span-5 lg:col-span-6">
        <div
          class="relative mx-auto max-w-sm rotate-[1.5deg] rounded-2xl border border-base-300/80 bg-base-100/95 p-5 shadow-xl backdrop-blur-md md:ms-auto md:me-4"
        >
          <p class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-base-content/45">
            No leitor
          </p>
          <ul class="mt-4 space-y-3 text-sm text-base-content/75">
            <li class="flex gap-3">
              <Icon icon="keyboard" :size="18" class="mt-0.5 shrink-0 text-primary" />
              <span>Qualquer letra abre a busca — útil para achar capítulo e versículo.</span>
            </li>
            <li class="flex gap-3">
              <Icon icon="globe" :size="18" class="mt-0.5 shrink-0 text-primary" />
              <span>Troca de versão sem recarregar a página inteira.</span>
            </li>
          </ul>
        </div>
        <div
          class="relative z-10 mx-auto -mt-10 max-w-[85%] -rotate-2 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-center text-sm font-medium text-base-content/80 backdrop-blur-sm md:ms-0 md:me-auto md:max-w-xs"
        >
          Leitura contínua entre capítulos e livros.
        </div>
      </div>
    </div>
  </section>
</template>
