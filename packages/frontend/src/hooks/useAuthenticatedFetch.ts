import { useAuth } from '@clerk/nextjs'

export function useAuthenticatedFetch() {
  const { getToken } = useAuth()

  const fetcher = async (
    url: string | URL | Request,
    requestOptions?: RequestInit | undefined,
  ) =>
    fetch(url, {
      ...requestOptions,
      headers: {
        ...requestOptions?.headers,
        authorization: `Bearer ${await getToken({ template: 'api-gateway' })}`,
      },
    })

  return {
    fetch: fetcher,
  }
}
