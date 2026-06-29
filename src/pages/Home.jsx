import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts(page, 4, search);

                setProducts(data.products);

                setPageCount(data.pagination.pageCount);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, [page, search]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="container">

            <Navbar />

            <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

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

            <div className="pagination">

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>

                    Page {page} of {pageCount}

                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === pageCount}
                >
                    Next
                </button>

            </div>

        </div>

        
    );
}