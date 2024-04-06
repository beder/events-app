import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { createPresignedUrl } from './createPresignedUrl'

async function uploadImage(
  file: File,
  fetcher: typeof fetch,
): Promise<string | undefined> {
  try {
    const { url } = (await createPresignedUrl(fetcher)) || {}

    if (!url) {
      return undefined
    }

    const image = await fetch(url, {
      body: file,
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    })

    if (!image.ok) {
      return undefined
    }

    return image.url.split('?')[0]
  } catch (error) {
    return undefined
  }
}

export const useUploadImage = () => {
  const fetcher = useAuthenticatedFetch()
  return (file: File) => uploadImage(file, fetcher.fetch)
}
