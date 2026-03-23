import type { Block } from 'payload'

import { link } from '@/fields/link'

export const CustomSwiperBlock: Block = {
  slug: 'customSwiperBlock',
  interfaceName: 'Swiper',
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
        },
        link({
          disableLabel: true,
          overrides: {
            label: 'backgroundLink',
            required: true,
          },
        }),
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'buttonsGroup',
          dbName: 'btns',
          type: 'array',
          fields: [
            {
              name: 'buttonType',
              dbName: 'type',
              type: 'select',
              defaultValue: 'link',
              options: [
                {
                  label: 'Normal',
                  value: 'link',
                },
                {
                  label: 'Video',
                  value: 'video',
                },
              ],
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              hooks: {
                beforeChange: [
                  ({ siblingData, value }) => {
                    if (siblingData?.buttonType === 'video') {
                      return 'Watch'
                    }
                    return value
                  },
                ],
              },
            },
            link({
              disableLabel: true,
              appearances: false,
              overrides: {
                required: true,
                admin: {
                  condition: (_: any, siblingData: any) => siblingData?.buttonType === 'link',
                },
              },
            }),
          ],
        },
      ],
    },
  ],
}
