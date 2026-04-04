<template>
  <section
    class="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-4"
  >
    <div
      class="relative overflow-hidden rounded-2xl border border-base-300/80 md:rounded-3xl"
    >
      <div
        class="absolute inset-0 bg-linear-to-br from-secondary/20 via-base-200/50 to-primary/15"
        aria-hidden="true"
      />

      <div class="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
        <div class="max-w-md">
          <h2 class="text-2xl font-bold tracking-tight text-base-content md:text-3xl">
            Pronto para ler?
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-base-content/70 md:text-base">
            O projeto é aberto: código no GitHub, melhorias e ideias são bem-vindas.
          </p>
        </div>
        <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap md:justify-end">
          <BibleLastChapterLink
            class="btn btn-primary w-full gap-2 rounded-xl px-6 shadow-md transition-[transform,box-shadow] duration-200 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] sm:w-auto"
          >
            <Icon icon="book_open" :size="16" />
            Ir para a Bíblia
          </BibleLastChapterLink>
          <a
            href="https://github.com/viniciusrvcruz/bibleasy-frontend"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-ghost w-full gap-2 rounded-xl border border-base-300 bg-base-100/80 backdrop-blur-sm transition-[transform,border-color] duration-200 hover:border-primary/30 active:scale-[0.98] sm:w-auto"
          >
            <Icon icon="github" :size="16" />
            Repositório
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
