<script setup lang="ts">
type Contributor = {
  name: string
  githubUrl: string
  /** GitHub avatar: e.g. https://github.com/username.png */
  avatarUrl: string
  linkedinUrl: string
}

const contributors: Contributor[] = [
  {
    name: 'Vinicius Cruz',
    githubUrl: 'https://github.com/viniciusrvcruz',
    avatarUrl: 'https://github.com/viniciusrvcruz.png',
    linkedinUrl: 'https://www.linkedin.com/in/viniciuscruz7',
  },
]
</script>

<template>
  <footer class="border-t border-base-300 bg-base-200/80">
    <div class="mx-auto max-w-6xl px-4 py-10">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <span class="text-lg font-semibold tracking-tight text-base-content">Bibleasy</span>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-base-content/55">
            Projeto open source dedicado a tornar a leitura da Bíblia na web mais acessível e fácil para todos.
          </p>
        </div>
        <nav class="flex flex-col gap-3 text-sm text-base-content/70 sm:flex-row sm:gap-5" aria-label="Rodapé">
          <BibleLastChapterLink class="transition-colors hover:text-base-content">
            Bíblia
          </BibleLastChapterLink>
          <RouterLink to="/help" class="transition-colors hover:text-base-content">
            Central de ajuda
          </RouterLink>
          <a
            href="https://github.com/viniciusrvcruz/bibleasy-frontend"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors hover:text-base-content"
          >
            Repositório
          </a>
        </nav>
      </div>

      <!-- Contributors: GitHub avatar + profile + LinkedIn -->
      <div class="mt-10 border-t border-base-300/80 pt-8">
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-base-content/50">
          Contribuidores
        </h2>
        <ul class="mt-4 flex flex-wrap gap-6">
          <li
            v-for="person in contributors"
            :key="person.githubUrl"
            class="flex min-w-0 max-w-full items-center gap-3"
          >
            <a
              :href="person.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="shrink-0 rounded-full ring-2 ring-base-300/80 transition-shadow hover:ring-primary/40"
            >
              <img
                :src="person.avatarUrl"
                :alt="`Foto de perfil do GitHub — ${person.name}`"
                width="48"
                height="48"
                class="size-12 rounded-full object-cover"
                loading="lazy"
              />
            </a>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-base-content">
                {{ person.name }}
              </p>
              <div class="mt-1 flex flex-wrap gap-3 text-xs">
                <a
                  :href="person.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary transition-colors hover:underline"
                >
                  GitHub
                </a>
                <a
                  :href="person.linkedinUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary transition-colors hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <p class="mt-10 border-t border-base-300/80 pt-6 text-xs leading-relaxed text-base-content/45">
        Bibleasy é um projeto independente. Algumas versões da Bíblia estão protegidas por direitos autorais; cada versão segue as regras de uso e os créditos definidos pelos seus editores e licenciadores.
      </p>
    </div>
  </footer>
</template>
