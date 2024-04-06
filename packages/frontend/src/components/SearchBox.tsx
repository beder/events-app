import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { getEvents } from '@/services/getEvents'
import useDebounce from '@/hooks/useDebounce'
import { ChangeEvent, useEffect, useState } from 'react'
import { Event } from '@/types'

export function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('')
  const [events, setEvents] = useState<Event[]>([])
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    async function searchEvents(q: string) {
      if (!q) {
        setEvents([])
        return
      }

      const events = await getEvents(q)

      setEvents(events || [])
    }

    searchEvents(debouncedSearchQuery)
  }, [debouncedSearchQuery])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className="relative w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Search"
          type="search"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
      {events.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-lg">
          {events.map((event) => (
            <li key={event.id} className="flex items-center">
              <a
                href={`/events/${event.id}`}
                className="block w-full px-4 py-2 text-gray-900 hover:bg-gray-100"
              >
                {event.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
