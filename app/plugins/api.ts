export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const requestHeaders = useRequestHeaders(['x-forwarded-for', 'x-real-ip'])

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
      if(import.meta.client) return

      const ip = requestHeaders['x-forwarded-for'] ?? requestHeaders['x-real-ip']

      if (!ip) return
      
      const ipStr = Array.isArray(ip) ? ip[0] : ip
      const headers = new Headers(options.headers)

      headers.set('X-Forwarded-For', ipStr)

      options.headers = headers
    },
  })

  return {
    provide: {
      api,
    },
  }
})
