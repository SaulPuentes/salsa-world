import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { socialLinksField } from '@/fields/socialLinks'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Dancer', value: 'dancer' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'DJ', value: 'dj' },
        { label: 'Performer', value: 'performer' },
        { label: 'Promoter', value: 'promoter' },
        { label: 'Media / Photographer / Videographer', value: 'media' },
        { label: 'Organizer', value: 'organizer' },
        { label: 'Admin', value: 'admin' },
      ],
      required: true,
      defaultValue: 'dancer',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      required: false,
    },
    socialLinksField,
  ],
  timestamps: true,
}
