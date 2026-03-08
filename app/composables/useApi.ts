import type { $Fetch, FetchOptions } from 'ofetch'

type RequestOptions = Omit<FetchOptions<'json'>, 'method' | 'body' | 'query'>

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export const useApi = () => {
  const api = useNuxtApp().$api as $Fetch

  const request = async <TResponse>(
    method: HttpMethod,
    url: string,
    data?: Record<string, unknown>,
    options?: RequestOptions
  ) => {
    const fetchOptions = {
      method,
      ...(method === 'get'
        ? data
          ? { query: data }
          : {}
        : data
          ? { body: data }
          : {}),
      ...options,
    }

    return api<TResponse>(url, fetchOptions)
  }

  const get = <TResponse>(
    url: string,
    query?: Record<string, any>,
    options?: RequestOptions
  ) => request<TResponse>('get', url, query, options)

  const post = <TResponse>(
    url: string,
    body?: Record<string, any>,
    options?: RequestOptions
  ) => request<TResponse>('post', url, body, options)

  const put = <TResponse>(
    url: string,
    body?: Record<string, any>,
    options?: RequestOptions
  ) => request<TResponse>('put', url, body, options)

  const del = <TResponse>(
    url: string,
    options?: RequestOptions
  ) => request<TResponse>('delete', url, undefined, options)

  return {
    get,
    post,
    put,
    del,
  }
}
