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
    <HomeHeroSection :last-chapter-url="lastChapterUrl" />
    <HomeStatsSection />
    <HomeFeaturesSection />
    <HomeHowItWorksSection />
    <HomeCtaSection :last-chapter-url="lastChapterUrl" />
    <HomePageFooter :last-chapter-url="lastChapterUrl" />
  </main>
</template>
