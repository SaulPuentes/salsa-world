'use client'
import { useEvents } from '@/providers/EventsProvider'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useEffect, Fragment } from 'react'
import type { Event } from '@/payload-types'

type PageClientProps = {
  events: Event[]
}

const PageClient = ({ events }: PageClientProps) => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const { setEvents } = useEvents()

  useEffect(() => {
    setHeaderTheme('light')
    setEvents(events)
  }, [setHeaderTheme])
  return <Fragment />
}

export default PageClient
