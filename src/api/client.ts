import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { getLocale } from '@/lib/i18n'

/**
 * Shared axios instance used by every Orval-generated request.
 * Put auth headers, tenant headers, error normalisation, etc. here.
 */
export const axiosInstance = axios.create({
  // Same-origin `/api` by default: MSW answers it in dev, the Vite proxy
  // (API_PROXY_TARGET) or the production reverse proxy forwards it to the BE.
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

// Tell the backend which language the user is using (localised errors, data).
axiosInstance.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = getLocale()
  return config
})

// Example: attach a bearer token once auth is in place.
// axiosInstance.interceptors.request.use((config) => {
//   const token = getAccessToken()
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

/** Orval mutator: every generated call goes through this function. */
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> =>
  axiosInstance({ ...config, ...options }).then(({ data }) => data)

// Orval uses these to type `error` in generated hooks.
export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData
