import api from "../api/axios";

export async function createOrder(order) {

    const token = localStorage.getItem("jwt");

    const response = await api.post(

        "/orders",

        {
            data: order
        },

        {
            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

}

export async function getMyOrders() {

    const token = localStorage.getItem("jwt");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const response = await api.get(

        `/orders?filters[userId][$eq]=${user.id}&sort=createdAt:desc`,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data.data;

}