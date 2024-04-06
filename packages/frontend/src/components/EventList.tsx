import { Event } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

import backgroundImage from '@/images/background-call-to-action.jpg'
import dayjs from 'dayjs'

export function EventList({ events }: { events: Event[] }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="mb-12 text-4xl font-bold">Our events</h1>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                <Image
                  src={event.imageUrl || backgroundImage}
                  alt={event.name}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  width={640}
                  height={427}
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-base font-medium text-gray-500">
                    {dayjs(event.date).format('ddd, MMM D, YYYY')}
                  </p>
                </div>
                <h3 className="text-base font-medium text-gray-900">
                  <Link href={`/events/${event.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {event.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">Leslie Alexander</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
