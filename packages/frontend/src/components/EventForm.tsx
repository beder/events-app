'use client'

import { SelectField } from './SelectField'
import { Button } from './Button'
import { TextField, TextareaField } from './Fields'
import type { CreateEventPayload, Event, UpdateEventPayload } from '@/types'
import { FormProvider, useForm } from 'react-hook-form'
import { useCreateEvent } from '@/services/createEvent'
import { useUpdateEvent } from '@/services/updateEvent'
import { useRouter } from 'next/navigation'
import { FileField } from './FileField'
import { useUploadImage } from '@/services/uploadImage'

const locations = [
  { id: 'paris', name: 'Paris' },
  { id: 'new-york', name: 'New York' },
  { id: 'london', name: 'London' },
  { id: 'tokyo', name: 'Tokyo' },
  { id: 'berlin', name: 'Berlin' },
  { id: 'beijing', name: 'Beijing' },
  { id: 'online', name: 'Online' },
]

export function EventForm({ event }: { event?: Event }) {
  const router = useRouter()

  const formMethods = useForm<CreateEventPayload | UpdateEventPayload>({
    defaultValues: {
      ...event,
      date: event?.date?.split('T')[0],
    },
  })

  const { handleSubmit } = formMethods

  const createEvent = useCreateEvent()
  const updateEvent = useUpdateEvent()
  const uploadImage = useUploadImage()

  const onSubmit = async (data: CreateEventPayload | UpdateEventPayload) => {
    const image = data?.image?.[0]

    if (image instanceof File) {
      const url = await uploadImage(image)

      data.imageUrl = url
    }

    const result = event?.id
      ? await updateEvent(event.id, data as UpdateEventPayload)
      : await createEvent(data)

    if (result?.id) {
      router.push(`/events/${result.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
            <h1 className="text-3xl font-medium text-gray-900">
              {event?.id ? 'Edit' : 'Create'} Event
            </h1>
            <p className="mt-4 text-lg font-normal text-gray-600">
              Please fill all the required information.
            </p>
            <div className="grid grid-cols-1 gap-8 sm:gap-16 lg:grid-cols-2 lg:items-start">
              <div className="h-full px-6 lg:px-0">
                <div className="relative isolate mx-auto h-full max-w-2xl rounded-3xl pr-0 lg:mx-0 lg:max-w-none lg:pl-6 lg:pt-6">
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-900/25">
                    <FileField name="image" imageUrl={event?.imageUrl} />
                  </div>
                </div>
              </div>
              <div className="px-6 lg:pt-4">
                <div className="mx-auto w-full lg:mx-0">
                  <TextField
                    id="name"
                    className="mt-2"
                    name="name"
                    placeholder="Event Title"
                  />

                  <TextareaField
                    className="mt-2"
                    defaultValue={''}
                    name="description"
                    rows={3}
                    placeholder="Description"
                  />

                  <TextField
                    className="mt-2"
                    name="date"
                    placeholder={new Date().toISOString().split('T')[0]}
                    type="date"
                  />

                  <SelectField
                    className="col-span-full mt-2"
                    name="location"
                    options={locations}
                  />
                </div>
              </div>
              <div className="flex max-w-none items-center px-6 lg:col-span-full">
                <Button color="indigo" type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </form>
  )
}
