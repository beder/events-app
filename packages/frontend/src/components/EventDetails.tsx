'use client'

import Image from 'next/image'
import type { Event } from '@/types'

import backgroundImage from '@/images/background-call-to-action.jpg'

import { CalendarIcon, MapPinIcon } from '@heroicons/react/20/solid'
import { Button } from './Button'
import dayjs from 'dayjs'
import { useDeleteEvent } from '@/services/deleteEvent'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export function EventDetails({ event }: { event: Event }) {
  const features = [
    {
      name: 'Date',
      description: dayjs(event.date).format('ddd, MMMM D, YYYY'),
      icon: CalendarIcon,
    },
    {
      name: 'Location',
      description: event.location,
      icon: MapPinIcon,
    },
  ]

  const { userId } = useAuth()

  const router = useRouter()

  const deleteEvent = useDeleteEvent()

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (event.id && confirm('Are you sure you want to delete this event?')) {
      const result = await deleteEvent(event.id)

      if (result) {
        router.push('/')
      }
    }
  }

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="relative isolate max-w-2xl overflow-hidden pr-0 sm:rounded-3xl lg:mx-0 lg:max-w-none lg:px-0">
            <div className="mx-auto max-w-xl max-h-96 sm:mx-0 sm:max-w-none">
              <Image
                src={event.imageUrl || backgroundImage}
                alt={event.name}
                width={576}
                height={384}
                className="-mb-12 w-[57rem] max-w-none bg-gray-800 ring-1 ring-white/10 sm:rounded-xl"
              />
            </div>
          </div>
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              {userId === event.userId && (
                <form className="mb-3" onSubmit={handleDelete}>
                  <Button
                    href={`/events/${event.id}/edit`}
                    variant="outline"
                    color="indigo"
                    type="button"
                  >
                    Edit Event
                  </Button>
                  <Button color="red" className="ml-6" type="submit">
                    Delete
                  </Button>
                </form>
              )}
              <p className="text-base font-semibold leading-7 text-indigo-600">
                {dayjs(event.date).format('MMM DD').toUpperCase()}
              </p>
              <h2 className="mt-2 text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {event.name}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                by{' '}
                <a
                  href="mailto:kristin.watson@example.com"
                  className="font-medium text-indigo-600"
                >
                  kristin.watson@example.com
                </a>
              </p>
            </div>
          </div>
          <div className="px-6 lg:px-0">
            <p className="text-lg leading-8 text-gray-600">
              {event.description}
            </p>
          </div>
          <div className="px-6 lg:px-0">
            <dl className="max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-14">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      className="absolute left-1 top-1 h-10 w-10 text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>{' '}
                  <dd>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
