import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'productCode', 'currentPrice', 'productType'],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subTitle',
      label: 'SubTitle',
      type: 'text',
    },
    {
      name: 'productType',
      label: 'Product Type',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'productCode',
      label: 'Product Code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'productUrl',
      label: 'Product URL',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'initialPrice',
          label: 'Initial Price',
          type: 'number',
        },
        {
          name: 'currentPrice',
          label: 'Current Price',
          type: 'number',
          required: true,
        },
        {
          name: 'discountPercentage',
          label: 'Discount Percentage',
          type: 'number',
          min: 0,
          max: 100,
        },
        {
          name: 'currency',
          label: 'Currency',
          type: 'text',
          defaultValue: 'USD',
        },
      ],
    },
    {
      name: 'imageUrl',
      label: 'Image URL',
      type: 'text',
    },
    {
      name: 'filters',
      label: 'Filters',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'type',
          label: 'Filter Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Color', value: 'color' },
            { label: 'Size', value: 'size' },
            { label: 'Gender', value: 'gender' },
            { label: 'On Sale', value: 'onSale' },
          ],
        },
        {
          name: 'color',
          label: 'Colors',
          type: 'select',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'color',
          },
          options: ['Black', 'White', 'Red', 'Blue', 'Green', 'Grey', 'Pink', 'Orange', 'Brown', 'Multi-Color'],
        },
        {
          name: 'size',
          label: 'Sizes',
          type: 'select',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'size',
          },
          options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          name: 'gender',
          label: 'Gender',
          type: 'select',
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'gender',
          },
          options: ['Men', 'Women', 'Unisex', 'Kids'],
        },
        {
          name: 'onSale',
          label: 'On Sale',
          type: 'checkbox',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'onSale',
          },
        },
      ],
    },
  ],
}
