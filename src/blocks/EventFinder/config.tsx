import { Block } from "payload";
import { link } from '@/fields/link'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const EventsFinder: Block = {
  slug: 'eventsFinder',
  labels: {
    singular: 'Events Finder',
    plural: 'Events Finders',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'showLogo',
      type: 'checkbox',
      label: 'Display Logo?',
      defaultValue: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'linkAction',
      type: 'select',
      options: [
        { label: 'Navigate to page', value: 'navigate' },
        { label: 'Load more', value: 'loadMore' },
      ],
      required: true,
      defaultValue: 'navigate',
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.linkAction === 'navigate',
        },
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  interfaceName: 'EventsFinderBlock',
}
