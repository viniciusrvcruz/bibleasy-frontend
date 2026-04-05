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
  <main
    class="home-main relative flex flex-1 flex-col bg-base-100"
  >
    <HomeHeroSection />
    <HomeVerseOfTheDaySection />
    <HomeQuickAccessSection />
    <HomeStatsSection />
    <HomeFeaturesSection />
    <HomeCtaSection />
    <HomePageFooter />
  </main>
</template>

<style scoped>
.home-main {
  background-image: radial-gradient(
    circle at 1px 1px,
    oklch(0.5 0.02 250 / 0.12) 1px,
    transparent 0
  );
  background-size: 24px 24px;
}

:global(html[data-theme="dark"]) .home-main,
:global(html[data-theme="synthwave"]) .home-main,
:global(html[data-theme="halloween"]) .home-main,
:global(html[data-theme="forest"]) .home-main,
:global(html[data-theme="black"]) .home-main,
:global(html[data-theme="luxury"]) .home-main,
:global(html[data-theme="dracula"]) .home-main,
:global(html[data-theme="business"]) .home-main,
:global(html[data-theme="night"]) .home-main,
:global(html[data-theme="coffee"]) .home-main,
:global(html[data-theme="dim"]) .home-main,
:global(html[data-theme="sunset"]) .home-main {
  background-image: radial-gradient(
    circle at 1px 1px,
    oklch(0.75 0.02 250 / 0.07) 1px,
    transparent 0
  );
}
</style>
