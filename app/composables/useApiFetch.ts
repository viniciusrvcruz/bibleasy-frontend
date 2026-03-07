import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  return useFetch(url, {
    key: url,
    $fetch: useNuxtApp().$api as typeof $fetch,
    ...options,
  })
}
