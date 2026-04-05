<template>
  <section
    class="relative mx-auto w-full max-w-6xl px-4 pt-6 pb-4 md:pt-10"
  >
    <div
      class="relative overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-[0_24px_80px_-24px_oklch(0.35_0.05_260/0.25)] md:rounded-3xl"
    >
      <!-- Color layers for depth -->
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
      <div
        class="hero-diagonal-grid pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        aria-hidden="true"
      />

      <div class="relative grid gap-10 p-6 md:grid-cols-12 md:gap-8 md:p-10 lg:p-12">
        <div class="md:col-span-7 lg:col-span-6">
          <p class="inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-100/80 px-3 py-1 text-xs font-medium text-base-content/65 backdrop-blur-sm">
            <span class="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Bíblia online · Open source
          </p>

          <h1 class="mt-6 text-[2rem] font-bold leading-[1.08] tracking-tight text-base-content sm:text-4xl md:text-5xl">
            Leia a Bíblia de forma
            <span class="relative inline-block">
              <span class="relative z-10 font-serif italic text-primary">fácil</span>
              <span
                class="absolute -inset-x-1 -bottom-1 z-0 h-3 skew-x-[-8deg] bg-secondary/25"
                aria-hidden="true"
              />
            </span>
            e
            <span class="relative inline-block">
              <span class="relative z-10 font-serif italic text-primary">intuitiva</span>
              <span
                class="absolute -inset-x-1 -bottom-1 z-0 h-3 skew-x-[-8deg] bg-secondary/25"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p class="mt-5 max-w-lg text-base leading-relaxed text-base-content/70 md:text-lg">
            O código é aberto: você pode usar, estudar e contribuir. 
          </p>

          <div class="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <BibleLastChapterLink
              class="btn btn-primary w-full gap-2 rounded-xl px-6 shadow-lg shadow-primary/20 transition-[transform,box-shadow] duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] sm:w-auto"
            >
              <Icon icon="book_open" :size="16" />
              Ir para a Bíblia
            </BibleLastChapterLink>
            <a
              href="https://github.com/viniciusrvcruz/bibleasy-frontend"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-ghost w-full gap-2 rounded-xl border border-base-300 bg-base-100/90 backdrop-blur-sm transition-[transform,border-color,background-color] duration-200 hover:border-primary/25 hover:bg-base-100 active:scale-[0.98] sm:w-auto"
            >
              <Icon icon="github" :size="16" />
              Repositório
            </a>
          </div>
        </div>

        <!-- Visual column: isolate stacking so content stays below the sticky header (z-20) -->
        <div class="relative isolate hidden md:col-span-5 md:block lg:col-span-6">
          <div
            class="relative z-1 mx-auto max-w-sm rotate-[1.5deg] rounded-2xl border border-base-300/80 bg-base-100/95 p-5 shadow-xl backdrop-blur-md md:ms-auto md:me-4"
          >
            <p class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-base-content/45">
              Em destaque
            </p>
            <ul class="mt-4 space-y-3 text-sm text-base-content/75">
              <li class="flex gap-3">
                <Icon icon="keyboard" :size="18" class="mt-0.5 shrink-0 text-primary" />
                <span>Pressione qualquer letra do teclado para abrir a busca, e pesquisar rapidamente.</span>
              </li>
              <li class="flex gap-3">
                <Icon icon="globe" :size="18" class="mt-0.5 shrink-0 text-primary" />
                <span>Alterne entre diferentes versões da Bíblia.</span>
              </li>
            </ul>
          </div>
          <div
            class="relative z-0 mx-auto mt-4 max-w-[85%] rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm font-medium text-base-content/80 backdrop-blur-sm md:ms-0 md:me-auto md:max-w-xs"
          >
            Várias versões, tema e tipografia ajustáveis e busca rápida num leitor simples.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-diagonal-grid {
  background-image: linear-gradient(135deg, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
