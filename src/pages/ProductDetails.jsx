import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/productService";

export default function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProduct() {

            try {

                setLoading(true);

                const data = await getProduct(id);

                setProduct(data);

            } catch (err) {

                setError("Failed to load product.");

            } finally {

                setLoading(false);

            }

        }

        loadProduct();

    }, [id]);

    if (loading) {

        return <h2>Loading product...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (
        <div>

            <h1>Product Details</h1>

            {product && (

                <>
                    <h2>{product.name}</h2>

                    <img
                        src={product.image}
                        alt={product.name}
                        width="300"
                    />

                    <p>{product.description}</p>

                    <h3>₱{product.price}</h3>

                    <p>Stock: {product.stock}</p>
                </>

            )}

        </div>
    );

}