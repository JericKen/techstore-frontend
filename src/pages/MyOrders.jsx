import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";

export default function MyOrders() {

    const { user } = useAuth();

    const [orders, setOrder] = useState([]);

    useEffect(() => {
        
        async function loadOrders() {
            
            const data = await getMyOrders(user.id);
            console.log(data);

            setOrder(data);

        }

        loadOrders();

    }, []);

    return (

        <div className="container">

            <h1>My Orders</h1>

            {orders.map(order => (

                <div
                    key={order.documentId}
                    className="order-card"
                >
                    <h2>{order.orderNumber}</h2>
                    <p>Status: {order.state}</p>
                    <p>Total: ₱{order.total}</p>
                </div>
            ))}

        </div>

    )
}