import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { cart } = useCart();
    const { user, logout } = useAuth();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (

        <nav className="navbar">

            <Link
                to="/"
                className="logo"
            >
                🛒 TechStore
            </Link>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                <Link to="/">
                    Products
                </Link>

                <Link to="/cart">
                    Cart ({totalItems})
                </Link>

                {user ? (

                    <>
                        <Link to="/orders">

                            My Orders

                        </Link>
                        <span className="welcome">

                            Hi, {user.username}

                        </span>

                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>

                ) : (

                    <Link to="/login">
                        
                        Login

                    </Link>

                )}

            </div>

        </nav>

    );

}