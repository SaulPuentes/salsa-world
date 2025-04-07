import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'ticketCost',
      type: 'number',
      required: false,
    },
    {
      name: 'eventType',
      type: 'select',
      options: [
        'Social Dance',
        'Festival',
        'Class',
        'Workshop',
      ],
      required: true,
    },
    {
      name: 'musicGenres',
      type: 'array',
      fields: [
        {
          name: 'genre',
          type: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'artists',
      type: 'array',
      fields: [
        {
          name: 'artist',
          type: 'text',
        },
      ],
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'imageGallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      required: false,
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
