export type CreateEventPayload = {
  name: string
  date: string
  description: string
  location: string
  image?: File[]
  imageUrl?: string
}

export type Event = {
  id?: number
  name: string
  date: string
  description?: string
  location: string
  userId: string
  imageUrl?: string
}

export type PresignedUrl = {
  url: string
}

export type SelectOption = {
  id: string
  name: string
}

export type UpdateEventPayload = CreateEventPayload & {
  id: number
}
