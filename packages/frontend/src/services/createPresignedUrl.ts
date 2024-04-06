import { PresignedUrl } from '@/types'

export async function createPresignedUrl(
  fetcher: typeof fetch,
): Promise<PresignedUrl | undefined> {
  try {
    const response = await fetcher(
      new URL('presigned-urls', process.env.NEXT_PUBLIC_API_URL).toString(),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.ok ? response.json() : undefined
  } catch (error) {
    return undefined
  }
}
