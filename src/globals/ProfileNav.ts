import { GlobalConfig } from 'payload'

export const ProfileNav: GlobalConfig = {
  slug:'profile-nav',
  fields: [
    {
      name:'items',
      type:'array',
      required:true,
      fields: [
        {
          name:'label', type:'text',required:true,
        },
        {
          name:'slug',
          type:'text',
          admin: {description:'if empty, lead to /profile/settings, otherwise what u wrote'},
          hooks: {
            beforeValidate: [
              ({ value }) => {
                if (typeof value !== 'string') return value
                const trimmed = value.trim().toLowerCase()
                if (trimmed === '') return ''
                return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
              },
            ],
          },
        },
        {
          name:'icon',
          type: 'upload',
          relationTo:'media',
          required:true
        },
      ]
    }
  ]
}