<template>
  <section class="relative mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="font-serif text-2xl italic text-base-content md:text-3xl">
          Versículo do dia
        </h2>
        <p class="mt-2 max-w-sm text-sm text-base-content/60">
          Em breve, um texto por dia — por enquanto, o espaço está reservado.
        </p>
      </div>
      <div
        class="hidden h-px flex-1 basis-48 bg-linear-to-r from-base-300 to-transparent sm:block"
        aria-hidden="true"
      />
    </div>

    <div class="relative mt-8 md:mt-10">
      <div
        class="absolute -start-3 top-6 bottom-6 w-1 rounded-full bg-linear-to-b from-primary via-secondary to-primary/40 md:-start-4"
        aria-hidden="true"
      />
      <div
        class="relative overflow-hidden rounded-2xl border border-base-300/80 bg-linear-to-br from-base-200/90 to-base-100 px-6 py-8 shadow-inner md:px-10 md:py-11"
      >
        <p
          class="pointer-events-none absolute end-4 top-4 font-serif text-7xl leading-none text-primary/[0.07] md:text-8xl"
          aria-hidden="true"
        >
          “
        </p>
        <blockquote class="relative max-w-prose font-serif text-lg leading-relaxed text-base-content md:text-xl">
          O texto do versículo do dia aparecerá aqui quando a integração estiver disponível.
        </blockquote>
        <p class="relative mt-8 text-xs uppercase tracking-widest text-base-content/45">
          Referência · versão
        </p>
      </div>
    </div>
  </section>
</template>
