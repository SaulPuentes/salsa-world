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
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'gallery',
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
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'organization',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'dates',
      type: 'array',
      required: false,
      fields: [
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
          name: 'startTime',
          type: 'text',
          required: false,
        },
        {
          name: 'duration',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'recurrence',
      type: 'group',
      label: 'Recurring Event Settings',
      fields: [
        {
          name: 'isRecurring',
          type: 'checkbox',
          label: 'This event repeats',
          defaultValue: false,
        },
        {
          name: 'frequency',
          type: 'select',
          label: 'Repeat Frequency',
          options: ['Daily', 'Weekly', 'Monthly'],
          admin: {
            condition: (_, siblingData) => siblingData.isRecurring,
          },
        },
        {
          name: 'repeatOn',
          type: 'select',
          label: 'Repeat on Days (for weekly)',
          hasMany: true,
          options: [
            { label: 'Sunday', value: 'sunday' },
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.isRecurring && siblingData.frequency === 'Weekly',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          required: false,
          label: 'Recurrence Start Date',
          admin: {
            condition: (_, siblingData) => siblingData.isRecurring,
          },
        },
        {
          name: 'recurrenceEndDate',
          type: 'date',
          label: 'Recurrence End Date',
          admin: {
            condition: (_, siblingData) => siblingData.isRecurring,
          },
        },
        {
          name: 'startTime',
          type: 'text',
          required: false,
          label: 'Event Start Time',
          admin: {
            condition: (_, siblingData) => siblingData.isRecurring,
          },
        },
        {
          name: 'duration',
          type: 'text',
          required: false,
          label: 'Event Duration',
          admin: {
            condition: (_, siblingData) => siblingData.isRecurring,
          },
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: false,
    },
    {
      name: 'address',
      type: 'text',
      required: false,
    },
    {
      name: 'eventType',
      type: 'relationship',
      relationTo: 'event-types',
      required: true,
    },
    
    {
      name: 'musicGenres',
      type: 'relationship',
      relationTo: 'music-genres',
      hasMany: true,
      required: true,
    },    
    {
      name: 'artists',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
      required: false,
    },
    ...slugField(),
  ],
};
