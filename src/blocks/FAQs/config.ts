import { Block } from "payload"

export const FAQs: Block = {
  slug: 'faqs',
  interfaceName: 'FAQsBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
}