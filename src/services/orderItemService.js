import api from "../api/axios";

export async function createOrderItem(orderItem) {

    const token = localStorage.getItem("jwt");

    const response = await api.post(

        "/order-items",

        {
            data: orderItem
        },

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

}