import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      maxRows: 5,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'headingUrl', type: 'text' },
          ],
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'subFooterText',
      type: 'array',
      label: 'Sub-footer',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}