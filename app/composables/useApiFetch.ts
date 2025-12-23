export function useApiFetch<T>(url: string) {
  const config = useRuntimeConfig()

  return useFetch<T>(`/api/${url}`, {
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
