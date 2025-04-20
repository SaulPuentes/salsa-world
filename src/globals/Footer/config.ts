import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { socialLinksField } from '@/fields/socialLinks'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'shortcuts',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contact',
      label: 'Contact Info',
      type: 'group',
      admin: {
        description: 'Contact information displayed in the footer',
      },
      fields: [
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          required: false,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: false,
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: false,
        },
      ],
    },
    socialLinksField,
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}