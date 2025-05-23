import { getPayload, PaginatedDocs } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import type { Event } from '@/payload-types'

type Locale = 'en' | 'es' | 'de'

export async function fetchEvents({ locale }: { locale: Locale }) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const events: PaginatedDocs<Event> = await payload.find({
    collection: 'events',
    draft,
    locale,
    limit: 100,
    pagination: false,
    sort: '-date',
  })

  return events
}
