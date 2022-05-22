import { createClient } from 'contentful'
const useContentful = () => {

    const client = createClient({
        space: "zrrknwyvwh3r",
        accessToken: "Kwfo4dmxc_wrP0E5kQoJ8ocnXix5ulb3mnf5xkYLvbY",
        host: "cdn.contentful.com"
    })

    const getProducts = async () => {
        try {
            const entries = await client.getEntries({
                content_type: "product",
                select: "fields"
            })
            const sanitizedEntries = [];
            entries.items.forEach(entry => {
                const entryFields = entry.fields;
                sanitizedEntries.push({
                    categoryId: entryFields.category.fields.id || null,
                    categoryName: entryFields.category.fields.name || null,
                    description: entryFields.description || null,
                    image: entryFields.image.fields.file.url || null,
                    ingredients: entryFields.ingredients || null,
                    isAvailable: entryFields.isAvailable || null,
                    name: entryFields.name || null,
                    price: entryFields.price || null,
                    usageInfo: entryFields.usageInfo || null,
                    id: entryFields.id,
                    slug: entryFields.id
                })
            })
            return sanitizedEntries;
        } catch (error) {
            confirm.error(`Error fetching products: ${error}`)
        }
    };

    const getCategories = async () => {
        try {
            const entries = await client.getEntries({
                content_type: "category",
                select: "fields"
            })
            const sanitizedEntries = [];
            entries.items.forEach(entry => {
                const entryFields = entry.fields;
                sanitizedEntries.push({
                    id: entryFields.id || null,
                    name: entryFields.name || null,
                    image: entryFields.image.fields.file.url || null,
                })
            })
            return sanitizedEntries;
        } catch (error) {
            confirm.error(`Error fetching categories: ${error}`)
        }
    };

    return { getProducts, getCategories }
}

export default useContentful