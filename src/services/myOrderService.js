import api from "../api/axios";

export async function getMyOrders(userId) {

    const token = localhost.getItem("jwt");

    const response = await api.get(

        `/orders?filters[userId][$eq]=${userId}&populate[order_items]=*`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data.data;

}