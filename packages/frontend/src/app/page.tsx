import { EventList } from '@/components/EventList'
import { getEvents } from '@/services/getEvents'

export default async function Home() {
  const events = await getEvents()

  if (!events) {
    return (
      <div className="m-20 text-center text-red-500">
        We couldn&apos;t load the events. Please try again later.
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="m-20 text-center">
        No events on the horizon... yet! Be the spark. Create one and let the fun begin!
      </div>
    )
  }

  return <EventList events={events} />
}
