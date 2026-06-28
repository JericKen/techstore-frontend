import api from "../api/axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
    const response = await api.get("/products?populate=*");

    return response.data.data.map(product => ({
        id: product.id,
        name: product.name,
        description:
            product.description?.[0]?.children?.[0]?.text ?? "",
        price: product.price,
        stock: product.stock,
        image: product.image
            ? `${BASE_URL}${product.image.url}`
            : null,
    }));
}