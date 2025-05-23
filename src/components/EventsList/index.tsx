'use client'

import { useEvents } from '@/providers/EventsProvider'

export function EventsList() {
  const { events } = useEvents()

  return (
    <ul>
      {events?.map(event => (
        <li key={event.id}>{event.title}</li>
      ))}
    </ul>
  )
}
