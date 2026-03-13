import type { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'

const generateSlugHook: FieldHook = ({ value, data, originalDoc }) => {
    // Якщо slug ввели руками — залишаємо
    if (typeof value === 'string' && value.trim()) return slugify(value.trim()) || ''

    // Інакше беремо title (під час редагування інколи зручно мати fallback на originalDoc)
    const title = (data?.title ?? originalDoc?.title ?? '').toString().trim()
    return slugify(title) || ''
}

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        { name: 'title', type: 'text', required: true, unique: true },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            hooks: { beforeValidate: [generateSlugHook] },
        },
    ],
}
