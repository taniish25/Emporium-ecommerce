import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, API } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    
    try {
      const { data } = await API.get('/api/cart');
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      throw new Error('Please login to add items to cart');
    }

    try {
      await API.post('/api/cart', { productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put(`/api/cart/${productId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/api/cart/${productId}`);
      await fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cart) {
        await API.delete(`/api/cart/${item.product._id}`);
      }
      setCart([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);

      setCart([]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.product._id === productId);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
