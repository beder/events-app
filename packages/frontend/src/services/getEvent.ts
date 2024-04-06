import { Event } from '@/types'

export async function getEvent(id: number): Promise<Event | undefined> {
  try {
    const response = await fetch(
      new URL(`events/${id}`, process.env.NEXT_PUBLIC_API_URL).toString(),
    )

    return response.ok ? response.json() : undefined
  } catch (error) {
    return undefined
  }
}
