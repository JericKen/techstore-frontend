import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="container">

            <Navbar />

            <h1>🛒 TechStore - Version 2 🚀</h1>

            <div className="product-grid">

                {products.length === 0 && (
                    <p>No products found.</p>
                )}

                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </div>

        
    );
}