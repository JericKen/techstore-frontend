import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMe } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const from =
    location.state?.from?.pathname || "/";

    async function handleLogin() {

        try {

            setLoading(true);
            setError("");

            const data = await login(
                email,
                password
            );

            localStorage.setItem(
                "jwt",
                data.jwt
            );

            const me = await getMe();

            setUser(me);

            navigate(from, {
                replace: true
            });

        } catch (error) {

            console.error(error);

            setError(
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }

    }

    if (user) {

        return <Navigate to="/" replace />;

    }

    return (

        <div className="container">

            <h1>Login</h1>

            {error && (

                <p className="error-message">

                    {error}

                </p>

            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>
                    setPassword(e.target.value)
                }
            />

            <button
                onClick={handleLogin}
                disabled={loading}
            >

                {loading
                    ? "Logging in..."
                    : "Login"}

            </button>

        </div>

    );

}