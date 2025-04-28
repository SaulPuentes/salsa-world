import { Block } from "payload";
import { link } from '@/fields/link'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const PromoBanner: Block = {
  slug: 'promoBanner',
  labels: {
    singular: 'Promo Banner',
    plural: 'Promo Banners',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },{
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    link({
      appearances: false,
    }),
  ],
  interfaceName: 'PromoBannerBlock',
}
