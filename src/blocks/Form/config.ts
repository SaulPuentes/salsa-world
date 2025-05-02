import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableContactInfo',
      type: 'checkbox',
      label: 'Enable Content and Contact Info',
    },
    {
      type: 'group',
      name: 'content',
      label: 'Content and Contact Info',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableContactInfo),
      },
      fields: [
        {
          name: 'intro',
          type: 'richText',
          label: 'Intro Content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              label: 'Email Address',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'address',
          label: 'Address',
          type: 'text',
        },
      ],
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
