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
  <main class="relative flex flex-1 flex-col bg-base-100">
    <!-- textura discreta: evita “página vazia” sem repetir o mesmo bloco em todo lugar -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 opacity-[0.35] dark:opacity-[0.2]"
      aria-hidden="true"
      style="background-image: radial-gradient(circle at 1px 1px, oklch(0.5 0.02 250 / 0.12) 1px, transparent 0); background-size: 24px 24px;"
    />

    <div class="relative mx-auto w-full max-w-6xl px-4 pt-6 pb-4 md:pt-10">
      <HomeHeroSection :last-chapter-url="lastChapterUrl" />
    </div>

    <!-- faixa editorial: largura um pouco menor que o hero -->
    <div class="relative mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <HomeVersePlaceholderSection />
    </div>

    <!-- bento mais largo -->
    <div class="relative mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
      <HomeQuickAccessSection />
    </div>

    <!-- números em contraste: quebra o ritmo das caixas claras -->
    <div class="relative mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <HomeStatsSection />
    </div>

    <div class="relative mx-auto w-full max-w-5xl px-4 py-6 md:py-12">
      <HomeFeaturesSection />
    </div>

    <div class="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-4">
      <HomeCtaSection :last-chapter-url="lastChapterUrl" />
    </div>

    <HomePageFooter />
  </main>
</template>
