import { Field } from "payload";

export const socialLinksField: Field = {
  name: 'socialLinks',
  label: 'Social Links',
  type: 'array',
  maxRows: 3,
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      name: 'platform',
      label: 'Platform',
      type: 'select',
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'TikTok', value: 'tiktok' },
      ],
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
  ],
}
