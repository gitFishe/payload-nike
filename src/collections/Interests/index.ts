import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { publicAccess } from '@/access/publicAccess'

export const Interests: CollectionConfig = {
  slug: 'interests',
  access: {
    read: publicAccess,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'link'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'link', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Product', value: 'product' },
        { label: 'Athlete', value: 'athlete' },
        { label: 'Sport', value: 'sport' },
        { label: 'Team', value: 'team' },
        { label: 'City', value: 'city' },
      ],
    },
  ],
}