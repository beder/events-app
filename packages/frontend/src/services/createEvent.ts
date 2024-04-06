import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { CreateEventPayload } from '@/types'
import { Event } from '@/types'

async function createEvent(
  data: CreateEventPayload,
  fetcher: typeof fetch,
): Promise<Event | undefined> {
  try {
    const response = await fetcher(
      new URL('events', process.env.NEXT_PUBLIC_API_URL).toString(),
      {
        method: 'POST',
        body: JSON.stringify(data),
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

export const useCreateEvent = () => {
  const fetcher = useAuthenticatedFetch()
  return (data: CreateEventPayload) => createEvent(data, fetcher.fetch)
}
