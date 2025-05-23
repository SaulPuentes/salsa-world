'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'
import type { Event } from '@/payload-types'

export interface EventsContextType {
  events: Event[]
  setEvents: (events: Event[]) => void
}

const initialContext: EventsContextType = {
  events: [],
  setEvents: () => null,
}

const EventsContext = createContext(initialContext)

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEventsState] = useState<Event[]>([])

  const setEvents = useCallback((newEvents: Event[]) => {
    setEventsState(newEvents)
  }, [])

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  )
}

export const useEvents = (): EventsContextType => useContext(EventsContext)
