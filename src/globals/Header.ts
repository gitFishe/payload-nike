import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'userDropdown',
      type: 'group',
      label: 'User Menu',
      fields: [
        {
          name: 'title',
          type: 'group',
          label: 'Title (heading link)',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'helpDropdown',
      type: 'group',
      label: 'Help Menu',
      fields: [
        {
          name: 'title',
          type: 'group',
          label: 'Title (heading link)',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tabName',
              type: 'text',
              required: true,
            },
            {
              name: 'tabLink',
              type: 'text',
            },
          ],
        },
        {
          name: 'colLinks',
          type: 'array',
          fields: [
            {
              name: 'col',
              type: 'array',
              label: {
                singular: 'Row',
                plural: 'Rows',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ulName',
                      type: 'text',
                    },
                    {
                      name: 'ulLink',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
            {
              name: 'showCol2',
              type: 'checkbox',
              label: 'Show Second Column Links',
              defaultValue: false,
            },
            {
              name: 'col2',
              type: 'array',
              label: 'Second Column Links',
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.showCol2),
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'ulName',
                      type: 'text',
                    },
                    {
                      name: 'ulLink',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'searchBar',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
