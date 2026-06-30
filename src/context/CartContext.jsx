import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    });

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    function addToCart(product) {

        setCart(previous => {

            const existing = previous.find(
                item => item.documentId === product.documentId
            );

            if (existing) {

                return previous.map(item =>

                    item.documentId === product.documentId
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item

                );

            }

            return [
                ...previous,
                {
                    ...product,
                    quantity: 1
                }
            ];

        });

    }

    function increaseQuantity(documentId) {

        setCart(previous =>

            previous.map(item =>

                item.documentId === documentId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item

            )

        );

    }

    function decreaseQuantity(documentId) {

        setCart(previous =>

            previous
                .map(item =>

                    item.documentId === documentId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item

                )
                .filter(item => item.quantity > 0)

        );

    }

    function removeItem(documentId) {

        setCart(previous =>

            previous.filter(

                item => item.documentId !== documentId

            )

        );

    }

    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeItem
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {
    return useContext(CartContext);
}