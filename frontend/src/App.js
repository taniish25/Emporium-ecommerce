// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { HelmetProvider } from 'react-helmet-async';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import LoginSignup from './pages/LoginSignup';
// import AdminPanel from './pages/AdminPanel';

// import Profile from './pages/Profile';
// import OrderHistory from './pages/OrderHistory';

// // If PrivateRoute component doesn't exist yet, remove it temporarily
// // import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <HelmetProvider>
//       <AuthProvider>
//         <CartProvider>
//           <Router>
//             <div className="min-h-screen bg-gray-50">
//               <Navbar />
//               {/* Temporarily remove Toaster if react-hot-toast not installed */}
//               {/* <Toaster position="top-right" /> */}
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/products/:id" element={<ProductDetails />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/login" element={<LoginSignup />} />
//                 <Route path="/admin" element={<AdminPanel />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/order-history" element={<OrderHistory />} />
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </div>
//           </Router>
//         </CartProvider>
//       </AuthProvider>
//     </HelmetProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';

// Import styles
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            {/* Dark theme wrapper */}
            <div className="dark bg-dark-bg min-h-screen">
              <Navbar />
              <Toaster 
                position="top-right"
                toastOptions={{
                  className: '!bg-dark-card !text-dark-text !border-dark-border',
                  style: {
                    background: '#1e293b',
                    color: '#f1f5f9',
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#1e293b',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#1e293b',
                    },
                  },
                }}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;