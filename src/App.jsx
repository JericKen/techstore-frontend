import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
            path="/products/:id"
            element={<ProductDetails />}
        />
        <Route
            path="/cart"
            element={
                <ProtectedRoute>

                    <Cart />

                </ProtectedRoute>
            }
        />
        <Route
            path="/login"
            element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;