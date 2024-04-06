import { Event } from '@/types'

export async function getEvents(q?: string): Promise<Event[] | undefined> {
  try {
    const endpointUrl = new URL('events', process.env.NEXT_PUBLIC_API_URL).toString()
    const searchParams = q ? `?${new URLSearchParams({ q }).toString()}` : ''

    const response = await fetch(`${endpointUrl}${searchParams}`)

    return response.ok ? response.json() : undefined
  } catch (error) {
    return undefined
  }
}
