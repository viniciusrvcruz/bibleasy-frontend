<template>
  <footer class="border-t border-base-300 bg-base-200/80">
    <div class="mx-auto max-w-6xl px-4 py-10">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span class="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon icon="book_open" :size="18" />
            </span>
            <span class="text-lg font-semibold tracking-tight text-base-content">Bibleasy</span>
          </div>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-base-content/55">
            Leitor web de código aberto. Foco na leitura das Escrituras.
          </p>
        </div>
        <nav class="flex flex-col gap-3 text-sm text-base-content/70 sm:flex-row sm:gap-10" aria-label="Rodapé">
          <RouterLink to="/help" class="transition-colors hover:text-base-content">
            Central de ajuda
          </RouterLink>
          <a
            href="https://github.com/viniciusrvcruz/bibleasy-frontend"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-base-content"
          >
            GitHub
          </a>
        </nav>
      </div>
      <p class="mt-10 border-t border-base-300/80 pt-6 text-xs text-base-content/45">
        Projeto independente. As traduções bíblicas permanecem sob os direitos de seus respectivos titulares.
      </p>
    </div>
  </footer>
</template>
