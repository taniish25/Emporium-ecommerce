import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const OrderHistory = () => {
  const { API } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/my-orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load orders');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircleIcon className="h-5 w-5" />;
      case 'Shipped': return <TruckIcon className="h-5 w-5" />;
      case 'Processing': return <ClockIcon className="h-5 w-5" />;
      case 'Cancelled': return <XCircleIcon className="h-5 w-5" />;
      default: return <ClockIcon className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Order History - MERNShop</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order History</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View and track all your past orders
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders. Start shopping to see your order history here.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{orders.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {orders.filter(o => o.orderStatus === 'Delivered').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <ClockIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Processing</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {orders.filter(o => o.orderStatus === 'Processing').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <TruckIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h2>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <div key={order._id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(order.orderDate)}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-1">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h3>
                        </div>

                        <div className="flex items-center space-x-4 mt-4 md:mt-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                            {getStatusIcon(order.orderStatus)}
                            <span className="ml-2">{order.orderStatus}</span>
                          </span>
                          
                          <button
                            onClick={() => setSelectedOrder(
                              selectedOrder?._id === order._id ? null : order
                            )}
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{order.items.length} items</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Payment</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{order.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">${order.total.toFixed(2)}</p>
                        </div>
                      </div>

                      {selectedOrder?._id === order._id && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
                          <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">Order Items</h4>
                          <div className="space-y-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <img
                                  src={item.image || item.product?.image}
                                  alt={item.name || item.product?.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="ml-4 flex-1">
                                  <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                    {item.name || item.product?.name}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Quantity: {item.quantity} × ${item.price?.toFixed(2) || item.product?.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900 dark:text-gray-100">
                                    ${((item.price || item.product?.price) * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                              <span className="text-gray-900 dark:text-gray-100">${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                              <span className="text-gray-900 dark:text-gray-100">${order.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 dark:text-gray-400">Tax</span>
                              <span className="text-gray-900 dark:text-gray-100">${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300 dark:border-gray-600">
                              <span className="text-gray-900 dark:text-gray-100">Total</span>
                              <span className="text-gray-900 dark:text-gray-100">${order.total.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Shipping Info */}
                          {order.shippingAddress && (
                            <div className="mt-6">
                              <h5 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Shipping Address</h5>
                              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <p className="text-gray-900 dark:text-gray-100">
                                  {order.shippingAddress.street}
                                </p>
                                <p className="text-gray-900 dark:text-gray-100">
                                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                </p>
                                <p className="text-gray-900 dark:text-gray-100">
                                  {order.shippingAddress.country}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistory;