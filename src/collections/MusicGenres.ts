import { slugField } from '@/fields/slug'
import type { CollectionConfig } from 'payload'

export const MusicGenres: CollectionConfig = {
  slug: 'music-genres',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
