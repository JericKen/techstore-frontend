import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {

    const { cart } = useCart();

    return (

        <nav className="navbar">

            <h2>🛒 TechStore</h2>

            <div className="nav-links">

                <a href="#">Home</a>

                <a href="#">Products</a>

                <Link to="/cart">

                    Cart ({cart.length})

                </Link>

                <a href="#">Login</a>

            </div>

        </nav>

    );

}