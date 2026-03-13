import type {CollectionConfig} from 'payload';

export const Offer: CollectionConfig = {
    slug: 'offer',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name:'description',
            type:'text',
        },
    ],
}