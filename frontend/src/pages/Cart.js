import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user, API } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    try {
      // Create order data
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        subtotal: getCartTotal(),
        tax: getCartTotal() * 0.08,
        shipping: getCartTotal() > 50 ? 0 : 5.99,
        total: getCartTotal() + (getCartTotal() * 0.08) + (getCartTotal() > 50 ? 0 : 5.99),
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        shippingAddress: user.address || {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        }
      };
      
      // Call API to create order
      const response = await API.post('/orders', orderData);
      
      if (response.data) {
        // Clear cart after successful order
        await clearCart();
        
        toast.success('Order placed successfully!');
        navigate('/order-history');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.response?.data?.error || 'Failed to place order. Please try again.');
    }
  };

  const handleQuantityChange = (productId, change) => {
    const item = cart.find(item => item.product._id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(productId, newQuantity);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please login to view your cart
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to see your saved items and checkout
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  return (
    <>
      <Helmet>
        <title>MERNShop - Shopping Cart</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Shopping Cart</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Cart Items</h2>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.map((item) => (
                      <div key={item.product._id} className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                  {item.product.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                  ${item.product.price.toFixed(2)} each
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product._id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleQuantityChange(item.product._id, -1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                                >
                                  <span className="text-lg">−</span>
                                </button>
                                <span className="w-12 h-8 flex items-center justify-center border-y border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.product._id, 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                                >
                                  <span className="text-lg">+</span>
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  ${item.product.price.toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {shipping === 0 ? 
                          '🎉 Free shipping on orders over $50!' : 
                          `Add $${(50 - subtotal).toFixed(2)} more for free shipping`
                        }
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Proceed to Checkout
                  </button>
                  
                  {(!user.address || !user.address.street) && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Please update your shipping address in your profile for faster checkout.
                      </p>
                      <Link 
                        to="/profile" 
                        className="text-sm text-yellow-900 font-medium hover:underline mt-1 inline-block"
                      >
                        Update Profile
                      </Link>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Secure checkout</span> • Your payment information is encrypted
                    </p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Have a promo code?
                  </h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-medium px-4 py-2 rounded-r-md transition duration-200">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="block w-full text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;