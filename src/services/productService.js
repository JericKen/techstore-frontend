import api from "../api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProducts(page = 1, pageSize = 4, search = "", category = "", sort = "createdAt:desc") {

    let url =
    `/products?populate=*` +
    `&pagination[page]=${page}` +
    `&pagination[pageSize]=${pageSize}`;

    if (search) {
        url +=
            `&filters[name][$containsi]=${encodeURIComponent(search)}`;
    }

    if (category) {
        url +=
            `&filters[category][documentId][$eq]=${category}`;
    }

    url += `&sort=${encodeURIComponent(sort)}`;

    const response = await api.get(url);

    return {
        products: response.data.data.map(product => ({
            id: product.id,
            documentId: product.documentId,
            name: product.name,
            description:
                product.description?.[0]?.children?.[0]?.text ?? "",
            price: product.price,
            stock: product.stock,
            category: product.category
                ? {
                    id: product.category.id,
                    documentId: product.category.documentId,
                    name: product.category.name,
                }
                : null,
            image: product.image
                ? `${BASE_URL}${product.image.url}`
                : null,
        })),

        pagination: response.data.meta.pagination
    };

}

export async function getProduct(documentId) {

    const response = await api.get(
        `/products/${documentId}?populate=*`
    );

    const product = response.data.data;

    return {
        id: product.id,
        documentId: product.documentId,
        name: product.name,
        description:
            product.description?.[0]?.children?.[0]?.text ?? "",
        price: product.price,
        stock: product.stock,
        category: product.category
            ? {
                id: product.category.id,
                documentId: product.category.documentId,
                name: product.category.name,
            }
            : null,
        image: product.image
            ? `${BASE_URL}${product.image.url}`
            : null,
    };

}