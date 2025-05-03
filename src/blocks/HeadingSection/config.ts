import type { Block } from 'payload';

export const HeadingSection: Block = {
  slug: 'headingSection',
  interfaceName: 'HeadingSectionBlock',
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      localized: true,
    },
    {
      name: 'size',
      label: 'Font Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      defaultValue: 'md',
      required: true,
    },
  ],
};