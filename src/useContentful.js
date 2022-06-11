import { createClient } from 'contentful'
import _ from 'lodash'
const useContentful = () => {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
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
                if (!_.isNil(entry)) {
                    const entryFields = entry.fields;
                    sanitizedEntries.push({
                        categoryId: entryFields.category.fields.id || null,
                        categoryName: entryFields.category.fields.name || null,
                        description: entryFields.description || null,
                        image: entryFields.image.fields.file.url || null,
                        ingredientsText: entryFields.ingredientsText || null,
                        ingredientsPhoto: entryFields.ingredientsPhoto.fields.file.url || null,
                        isAvailable: entryFields.isAvailable || null,
                        name: entryFields.name || null,
                        price: entryFields.price || null,
                        usageInfo: entryFields.usageInfo || null,
                        id: entryFields.id,
                        slug: entryFields.id
                    })
                }

            })
            return sanitizedEntries;
        } catch (error) {
            console.error(`Error fetching products: ${error}`)
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
            console.error(`Error fetching categories: ${error}`)
        }
    };

    const getSettings = async () => {
        try {
            const entries = await client.getEntries({
                content_type: "siteInfo",
                select: "fields"
            })
            const settingsObject = _.head(entries.items);
            const entryFields = settingsObject.fields;
            const sliderPhotos = _.map(entryFields.homeSliderPhotos, item => item.fields.file.url);
            const sanitizedObject = {
                footerLogo: entryFields.footerLogo.fields.file.url || null,
                headerLogo: entryFields.headerLogo.fields.file.url || null,
                deliveryAndPayment: entryFields.deliveryAndPayment || null,
                homeSliderPhotos: sliderPhotos || [],
                homePageInfoText: entryFields.homePageInfoText || null,
                phoneNumber: entryFields.phoneNumber || null,
                email: entryFields.email || null,
            }
            return sanitizedObject;
        } catch (error) {
            console.error(`Error fetching settings: ${error}`)
        }
    };

    return { getProducts, getCategories, getSettings }
}

export default useContentful