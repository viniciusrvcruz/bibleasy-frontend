export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const baseURL = import.meta.server
    ? config.apiBaseUrl
    : config.public.apiBaseUrl

  const api = $fetch.create({
    baseURL: `${baseURL}/api/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    retry: 0,
    onRequest({ options }) {
      if (import.meta.client) return

      const apiKey = config.apiKey

      const headers = new Headers(options.headers)
      headers.set('X-Api-Key', apiKey)
      options.headers = headers
    },
  })

  return {
    provide: {
      api,
    },
  }
})
