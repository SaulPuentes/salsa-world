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
          // editor: lexicalEditor({
          //   features: ({ rootFeatures }) => {
          //     return [
          //       ...rootFeatures,
          //       HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          //       FixedToolbarFeature(),
          //       InlineToolbarFeature(),
          //     ]
          //   },
          // }),
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