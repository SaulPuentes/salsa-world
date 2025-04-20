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
      admin: {
        condition: () => true
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    socialLinksField,
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
