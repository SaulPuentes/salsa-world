import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { socialLinksField } from '@/fields/socialLinks'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      localized: true,
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'privateArea',
      label: 'Private Area',
      localized: true,
      type: 'group',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        description: 'Configure the optional button in the header (e.g., login, dashboard, or CTA).',
      },
    },
    socialLinksField,
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
