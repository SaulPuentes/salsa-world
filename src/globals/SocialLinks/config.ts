import type { GlobalConfig } from 'payload'
import { socialLinksField } from '@/fields/socialLinks'

export const SocialSettings: GlobalConfig = {
  slug: 'social-settings',
  access: {
    read: () => true,
  },
  fields: [socialLinksField],
}
