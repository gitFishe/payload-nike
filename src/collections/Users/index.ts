import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { publicAccess } from '@/access/publicAccess'
import { adminOrSelf } from '@/access/adminOrSelf'
import { checkRole } from '@/access/utilities'
import { shoeSizeOptions, genderOptions } from '@/lib/preferences'

import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: publicAccess,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    group: 'Users',
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 1209600,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd-MM-yyyy',
        },
      },
    },
    {
      name: 'roles',
      type: 'select',
      access: {
        create: adminOnlyFieldAccess,
        read: adminOnlyFieldAccess,
        update: adminOnlyFieldAccess,
      },
      defaultValue: ['customer'],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
    },
    {
      name: 'orders',
      type: 'join',
      collection: 'orders',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'cart',
      type: 'join',
      collection: 'carts',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id', 'createdAt', 'total', 'currency', 'items'],
      },
    },
    {
      name: 'addresses',
      type: 'join',
      collection: 'addresses',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['id'],
      },
    },
    {
      name:'interests',
      type:'relationship',
      relationTo:'interests',
      hasMany:true,
    },
    {
      name: 'paymentMethods',
      type: 'join',
      collection: 'paymentMethods',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['label', 'brand', 'last4', 'isDefault'],
      },
    },
    {
      name: 'giftCards',
      type: 'join',
      collection: 'giftCards',
      on: 'customer',
      admin: {
        allowCreate: false,
        defaultColumns: ['code', 'balance', 'currency', 'status'],
      },
    },
    {
      name: 'shopPreferences',
      type: 'group',
      label: 'Shop Preferences',
      fields: [
        {
          name: 'shoeSize',
          type: 'select',
          options: shoeSizeOptions,
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Women or Men',
          options: genderOptions,
        },
      ],
    },
    {
      name: 'communicationPreferences',
      type: 'group',
      label: 'Communication Preferences',
      fields: [
        {
          name: 'emailOptIn',
          type: 'checkbox',
          label: 'Yes, send me emails',
          defaultValue: false,
        },
      ],
    },
  ],
}
