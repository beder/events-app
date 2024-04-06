import { EventForm } from '@/components/EventForm'

export default function Home() {
  const event = {
    date: new Date().toISOString(),
    location: 'paris',
    name: '',
  }

  return <EventForm event={event} />
}
