import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    
    <CartProvider>

      <StrictMode>
        <App />
      </StrictMode>,

    </CartProvider>

  </AuthProvider>
)
