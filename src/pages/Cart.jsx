import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {

    const {

        cart,

        increaseQuantity,

        decreaseQuantity,

        removeItem

    } = useCart();

    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

    return (

        <div className="container">

            <h1>Shopping Cart</h1>

            {cart.length === 0 ? (

                <p>Your cart is empty.</p>

            ) : (

                cart.map(item => (

                    <div
                        key={item.documentId}
                    >

                        <h3>{item.name}</h3>

                        <p>₱{item.price}</p>

                        <div>

                            <button
                                onClick={() =>
                                    decreaseQuantity(item.documentId)
                                }
                            >
                                -
                            </button>

                            <span>

                                {item.quantity}

                            </span>

                            <button
                                onClick={() =>
                                    increaseQuantity(item.documentId)
                                }
                            >
                                +
                            </button>

                            <p>

                                Subtotal:

                                ₱{(item.price * item.quantity).toFixed(2)}

                            </p>

                            <button
                                onClick={() =>
                                    removeItem(item.documentId)
                                }
                            >

                                Remove

                            </button>

                        </div>

                    </div>

                ))

            )}

            <hr />

            <h2>

                Total:

                ₱{total.toFixed(2)}
            
            </h2>

            <Link to="/checkout">

                <button>

                    Proceed to Checkout

                </button>

            </Link>

        </div>

    );

}