import api from "../api/axios";

export async function getCategories() {
    const response = await api.get("/categories");

    return response.data.data.map(category => ({
        id: category.id,
        documentId: category.documentId,
        name: category.name
    }));
}