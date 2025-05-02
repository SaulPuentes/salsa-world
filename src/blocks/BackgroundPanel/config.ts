import { Block } from "payload";

export const BackgroundPanel: Block = {
  slug: 'backgroundPanel',
  fields: [
    {
      name: 'showLogo',
      type: 'checkbox',
      label: 'Display Logo',
      defaultValue: true,
    },
    {
      name: 'height',
      label: 'Section Height',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      defaultValue: 'md',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundImageDesktop',
          label: 'Desktop Background Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'backgroundImageMobile',
          label: 'Mobile Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'textContent',
      label: 'Text Content',
      type: 'text',
      required: false,
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
  interfaceName: 'BackgroundPanelBlock',
};
