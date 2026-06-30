import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const [sort, setSort] = useState("createdAt:desc");

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts(
                    page,
                    4,
                    debouncedSearch,
                    selectedCategory,
                    sort
                );

                setProducts(data.products);
                setError("");
                setPageCount(data.pagination.pageCount);
            } catch (error) {

                console.error(error);

                setError("Unable to load products.");

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, [page, debouncedSearch, selectedCategory, sort]);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {

        setPage(1);

    }, [debouncedSearch, selectedCategory, sort]);

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    if (loading) {
        return (
            <div className="product-grid">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
            </div>
        );
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

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
            >
                <option value="">All Categories</option>

                {categories.map(category => (
                    <option
                        key={category.id}
                        value={category.documentId}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="category-select"
            >
                <option value="createdAt:desc">Newest</option>
                <option value="createdAt:asc">Oldest</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="name:asc">Name: A-Z</option>
                <option value="name:desc">Name: Z-A</option>
            </select>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

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