import tailwindcss from '@tailwindcss/vite';
import Aura from '@primeuix/themes/aura';
import { env } from './app/utils/env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/seo',
  ],

  runtimeConfig: {
    apiBaseUrl: env.NUXT_API_BASE_URL || env.NUXT_PUBLIC_API_BASE_URL,

    public: {
      apiBaseUrl: env.NUXT_PUBLIC_API_BASE_URL,
      defaultVersionAbbreviation: env.NUXT_PUBLIC_DEFAULT_VERSION_ABBREVIATION,
    },
  },

  icon: {
    componentName: 'NuxtIcon'
  },

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    storage: 'cookie',
    dataValue: 'theme'
  },

  // SEO Configuration
  site: {
    url: 'https://bibleasy.com',
    name: 'Bibleasy',
    description: 'Leia a Bíblia online de forma moderna e intuitiva. Acesse diferentes versões, personalize sua experiência e encontre qualquer versículo rapidamente.',
    defaultLocale: 'pt-BR',
  },

  seo: {
    meta: {
      author: 'Bibleasy',
      applicationName: 'Bibleasy',
    },
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    excludeAppSources: ['nuxt:pages'],
    sources: ['/api/__sitemap__/urls'],
  },

  robots: {
    disallow: [],
    sitemap: '/sitemap.xml',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Bibleasy',
      url: 'https://bibleasy.com',
      logo: 'https://bibleasy.com/favicon.ico',
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
