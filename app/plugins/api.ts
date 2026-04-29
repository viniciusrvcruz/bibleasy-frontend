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
      const headers = new Headers(options.headers)

      if (!(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
      } else {
        headers.delete('Content-Type')
      }

      if (import.meta.server) {
        const apiKey = config.apiKey
        headers.set('X-Api-Key', apiKey)
      }

      options.headers = headers
    },
  })

  return {
    provide: {
      api,
    },
  }
})
