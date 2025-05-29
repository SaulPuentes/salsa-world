import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'


export const hero: Field = {
  name: 'hero',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      type: 'row',
      fields: [
        {
          name: 'bgImage',
          label: 'Background Image',
          type: 'upload',
          admin: {
            width: '50%',
            condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
          },
          relationTo: 'media',
          required: true,
        },
        {
          name: 'bgImageMobile',
          label: 'Background Image (Mobile)',
          type: 'upload',
          admin: {
            width: '50%',
            condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
          },
          relationTo: 'media',
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'overlayImage',
          type: 'upload',
          label: 'Overlay Image',
          relationTo: 'media',
          admin: {
            width: '50%',
            condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
          },
        },
        {
          name: 'mobileOverlayImage',
          type: 'upload',
          label: 'Overlay Image (Mobile)',
          relationTo: 'media',
          admin: {
            width: '50%',
            condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
          },
        },
      ],
    },
  ],
  label: false,
}
