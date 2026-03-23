import type { Block } from 'payload'

import { link } from '@/fields/link'

export const BigImgsBlock: Block = {
  slug: 'bigImgs',
  interfaceName: 'BigImgs',
  fields: [
    {
      name: 'blocks',
      type: 'array',
      required:true,
      maxRows: 2,
      fields: [
        {
          label: 'Background Image',
          name: 'img',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        link({
          disableLabel: true,
          appearances: false,
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'btn',
          type: 'text',
        },
      ],
    },
  ],
}
