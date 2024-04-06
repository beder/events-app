import { EventForm } from '@/components/EventForm'
import { getEvent } from '@/services/getEvent'
import { notFound } from 'next/navigation'

export default async function Home({ params }: { params: { id: string } }) {
  const event = await getEvent(Number(params.id))

  if (!event) {
    return notFound()
  }

  return <EventForm event={event} />
}
