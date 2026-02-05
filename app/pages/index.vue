<script setup lang="ts">
useSeoMeta({
  title: 'Bibleasy - Leia a Bíblia Online de Forma Fácil e Intuitiva',
  description: 'Leia a Bíblia online gratuitamente com interface fácil. Acesse diferentes versões, personalize temas, busque versículos e leia em qualquer dispositivo.',
  ogTitle: 'Bibleasy - Bíblia Online Fácil e Gratuita',
  ogDescription: 'Explore as Escrituras com uma interface bonita e fácil de usar. Diferentes versões da Bíblia, personalização de temas e busca rápida de versículos.',
  ogType: 'website',
  twitterTitle: 'Bibleasy - Bíblia Online Fácil e Gratuita',
  twitterDescription: 'Leia a Bíblia online gratuitamente. Interface fácil, múltiplas versões e personalização completa.',
})

const { lastChapterUrl } = useNavigateToBible()

const siteUrl = useSiteConfig().url ?? 'https://bibleasy.com'

useSchemaOrg([
  defineWebSite({
    name: 'Bibleasy',
    description: 'Leia a Bíblia online de forma fácil e intuitiva',
  }),
  defineWebPage({
    '@type': 'WebPage',
    name: 'Página Inicial',
    description: 'Leia a Bíblia online gratuitamente com interface fácil e intuitiva.',
  }),
  defineItemList({
    name: 'Navegação principal',
    itemListElement: [
      defineListItem({ position: 1, name: 'Início', item: siteUrl }),
      defineListItem({ position: 2, name: 'Bíblia', item: `${siteUrl}/${lastChapterUrl}` }),
      defineListItem({ position: 3, name: 'Central de Ajuda', item: `${siteUrl}/help` }),
    ],
  }),
])
</script>

<template>
  <main class="flex-1">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <!-- Background layers (separate from content so decorative elements are visible and clicks work) -->
      <div class="absolute inset-0 bg-base-100" aria-hidden="true" />
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden="true" />
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 text-center px-4 py-16 max-w-5xl mx-auto">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Icon icon="rocket" :size="16" />
          <span>100% Gratuito e Open Source</span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Leia a Bíblia de forma
          <br>
          <span class="text-primary">fácil</span>
          e
          <span class="text-primary">intuitiva</span>
        </h1>
        
        <p class="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
          Explore as Escrituras Sagradas com uma interface bonita, personalizável e fácil de usar.
          Múltiplas versões, busca instantânea e leitura em qualquer dispositivo.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <RouterLink
            :to="lastChapterUrl"
            class="btn btn-primary btn-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            <Icon icon="book_open" :size="22" />
            Começar a Ler
          </RouterLink>
          <a
            href="https://github.com/viniciusrvcruz/bibleasy-frontend"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline btn-lg"
          >
            <Icon icon="github" :size="22" />
            Repositório
          </a>
        </div>
        
        <!-- Highlights -->
        <div class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-base-content/60">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-primary" />
            <span>Sem cadastro necessário</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-primary" />
            <span>Funciona em qualquer dispositivo</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-primary" />
            <span>Múltiplas versões da Bíblia</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="hidden sm:block py-10 sm:py-14 bg-base-200">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-0 text-center divide-y sm:divide-y-0 sm:divide-x divide-base-content/10">
          <div class="rounded-xl bg-base-200 p-4 sm:py-4">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Múltiplas</div>
            <div class="text-base-content/60 text-xs sm:text-sm font-medium">Versões da Bíblia</div>
          </div>
          <div class="rounded-xl bg-base-200 p-4 sm:py-4">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Dezenas</div>
            <div class="text-base-content/60 text-xs sm:text-sm font-medium">de Temas</div>
          </div>
          <div class="rounded-xl bg-base-200 p-4 sm:py-4">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">100%</div>
            <div class="text-base-content/60 text-xs sm:text-sm font-medium">Gratuito</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
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
              Acesse diferentes traduções da Bíblia e compare versículos.
              Troque entre versões com apenas um clique.
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
              Ajuste fonte, tamanho e espaçamento ao seu gosto.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="p-6 rounded-2xl bg-base-200">
            <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Icon icon="search" :size="28" />
            </div>
            <h3 class="text-xl font-bold mb-2">Busca Instantânea</h3>
            <p class="text-base-content/60">
              Digite qualquer letra e encontre versículos imediatamente.
              Pesquisa inteligente por livro, capítulo ou palavra-chave.
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

    <!-- How it Works Section -->
    <section class="py-24 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <span class="text-primary font-semibold text-sm uppercase tracking-wider">Como funciona</span>
          <h2 class="text-3xl md:text-4xl font-bold mt-2 mb-4">Simples e direto ao ponto</h2>
          <p class="text-lg text-base-content/60 max-w-2xl mx-auto">
            Comece sua leitura em apenas 3 passos
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 class="text-xl font-bold mb-2">Acesse o site</h3>
            <p class="text-base-content/60">
              Não precisa criar conta nem baixar nada. É só acessar e começar.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 class="text-xl font-bold mb-2">Escolha o livro</h3>
            <p class="text-base-content/60">
              Navegue pelos livros da Bíblia ou use a busca rápida.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 class="text-xl font-bold mb-2">Leia e personalize</h3>
            <p class="text-base-content/60">
              Ajuste tema, fonte e versão. Sua configuração fica salva.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <!-- CTA Section -->
    <section class="py-24 bg-base-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4">
          Pronto para começar sua jornada?
        </h2>
        <p class="text-xl text-base-content/70 mb-10 max-w-2xl mx-auto">
          Descubra uma nova forma de ler e explorar as Escrituras Sagradas.
        </p>
        <RouterLink
          :to="lastChapterUrl"
          class="btn btn-primary btn-lg"
        >
          <Icon icon="book_open" :size="22" />
          Começar a Ler Agora
        </RouterLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-base-300">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <!-- Logo and description -->
          <div class="text-center md:text-left">
            <div class="text-2xl font-bold mb-2">Bibleasy</div>
            <p class="text-base-content text-sm max-w-md">
              Projeto open source dedicado a tornar a leitura da Bíblia mais acessível e fácil para todos.
            </p>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap justify-center gap-6 text-sm">
            <RouterLink :to="lastChapterUrl" class="hover:text-primary transition-colors">
              Bíblia
            </RouterLink>
            <RouterLink to="/help" class="hover:text-primary transition-colors">
              Central de Ajuda
            </RouterLink>
          </div>

          <!-- Social -->
          <SharedSocialLinks :icon-size="22" />
        </div>

        <div class="border-t border-base-content/10 mt-8 pt-8 text-center text-sm text-base-content">
          <p>Feito com ❤️ por Vinicius Cruz</p>
        </div>
      </div>
    </footer>
  </main>
</template>
