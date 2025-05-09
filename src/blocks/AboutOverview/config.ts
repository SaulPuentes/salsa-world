import type { Block } from 'payload'

export const AboutOverview: Block = {
  slug: 'aboutOverview',
  interfaceName: 'AboutOverviewBlock',
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      maxRows: 3,
      fields: [
        {
          name: 'content',
          type: 'group',
          label: 'Section Content',
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
              name: 'bgColor',
              type: 'select',
              label: 'Background Color',
              required: true,
              defaultValue: 'orange',
              options: [
                { label: 'Orange', value: 'orange' },
                { label: 'Pink', value: 'pink' },
                { label: 'Violet', value: 'violet' },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'footerImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Footer Image (Desktop)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'footerImageMobile',
          type: 'upload',
          relationTo: 'media',
          label: 'Footer Image (Mobile)',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
