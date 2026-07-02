import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { createOrderItem } from "../services/orderItemService";

export default function Checkout() {

    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    function generateOrderNumber() {

        return `ORD-${Date.now()}`;

    }

    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

    async function handlePlaceOrder() {

        try {

            setLoading(true);

            const order = {
                orderNumber: generateOrderNumber(),
                total,
                state: "Pending",
                userId: user.id,
                username: user.username,
                email: user.email,
            };

            const createdOrder = await createOrder(order);

            for (const item of cart) {

                console.log({
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity,
                    order: createdOrder.data.documentId
                });

                await createOrderItem({

                    productName: item.name,

                    price: item.price,

                    quantity: item.quantity,

                    subtotal: item.price * item.quantity,

                    order: createdOrder.data.documentId

                });

            }

            clearCart();    

            alert("Order placed successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);

            console.log(error.response);

            console.log(error.response?.data);

            alert("Failed to place order.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="container">

            <h1>Checkout</h1>

            <h2>Order Summary</h2>

            {cart.map(item => (

                <div key={item.documentId}>

                    <h3>{item.name}</h3>

                    <p>

                        {item.quantity} × ₱{item.price}

                    </p>

                </div>

            ))}

            <hr />

            <h2>

                Total:

                ₱{total.toFixed(2)}

            </h2>

            <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
            >

                {loading
                    ? "Placing Order..."
                    : "Place Order"}

            </button>

        </div>

    );

}