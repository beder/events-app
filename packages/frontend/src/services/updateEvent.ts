import { UpdateEventPayload } from '@/types'
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch'
import { Event } from '@/types'

async function updateEvent(
  id: number,
  data: UpdateEventPayload,
  fetcher: typeof fetch,
): Promise<Event | undefined> {
  try {
    const response = await fetcher(
      new URL(`events/${id}`, process.env.NEXT_PUBLIC_API_URL).toString(),
      {
        method: 'PUT',
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

export const useUpdateEvent = () => {
  const fetcher = useAuthenticatedFetch()
  return (id: number, data: UpdateEventPayload) =>
    updateEvent(id, data, fetcher.fetch)
}
