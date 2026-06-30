import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

    const { addToCart } = useCart();    

    return (

        <Link to={`/products/${product.documentId}`}>
            <div className="product-card">

                <img
                    src={
                        product.image ??
                        "https://placehold.co/400x300?text=No+Image"
                    }
                    alt={product.name}
                    className="product-image"
                />

                <div className="product-content">

                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <div className="product-price">

                        ₱{product.price}

                    </div>

                    <div className="stock">

                        Stock: {product.stock}

                    </div>

                    <span
                        className="btn"
                        onClick={(e) => {

                            e.preventDefault();

                            addToCart(product);

                        }}
                    >

                        Add to Cart

                    </span>

                </div>

            </div>
        </Link>

    );

}