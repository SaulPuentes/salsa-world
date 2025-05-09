import type { Block } from 'payload'

export const TextOverlayBlock: Block = {
  slug: 'textOverlayBlock',
  interfaceName: 'TextOverlayBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image (Desktop)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'backgroundImageMobile',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image (Mobile)',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
