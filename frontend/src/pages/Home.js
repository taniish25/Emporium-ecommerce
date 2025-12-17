import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { API } = useAuth();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setFeaturedProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Emporium - Premium Shopping Destination</title>
        <meta name="description" content="Discover premium products at Emporium. Your one-stop shop for electronics, fashion, home goods and more." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="hero-section relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                <SparklesIcon className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm text-primary font-medium">Premium Shopping Experience</span>
              </div>
              <h1 className="hero-title">
                Welcome to <span className="text-gradient">Emporium</span>
              </h1>
              <p className="hero-subtitle">
                Discover premium products with exclusive deals and unparalleled shopping experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link 
                  to="/products" 
                  className="inline-flex items-center btn-primary text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Shop Now
                </Link>
                <Link 
                  to="/products?category=Electronics" 
                  className="inline-flex items-center btn-secondary text-lg px-8 py-3 rounded-full border border-dark-border"
                >
                  View Electronics
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-dark-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked selection of our premium products</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="group">
                  <div className="product-card">
                    <Link to={`/products/${product._id}`} className="block overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                    </Link>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="product-title group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <p className="product-description mb-4">
                        {product.description.length > 100 
                          ? `${product.description.substring(0, 100)}...` 
                          : product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="product-price">
                          ${product.price}
                        </span>
                        <Link
                          to={`/products/${product._id}`}
                          className="text-primary hover:text-primary-dark font-medium text-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="btn-primary px-8 py-3 rounded-full"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-dark-card/50 to-dark-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Why Choose Emporium</h2>
              <p className="section-subtitle">Experience shopping like never before</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 glass-morphism rounded-2xl hover:border-primary/30 transition-all duration-300">
                <div className="bg-gradient-to-br from-primary to-purple-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <TruckIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Free Shipping</h3>
                <p className="text-dark-text-secondary">
                  Enjoy free shipping on all orders over $100. Fast delivery guaranteed.
                </p>
              </div>
              
              <div className="text-center p-8 glass-morphism rounded-2xl hover:border-primary/30 transition-all duration-300">
                <div className="bg-gradient-to-br from-secondary to-yellow-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Secure Payment</h3>
                <p className="text-dark-text-secondary">
                  100% safe & encrypted transactions. Your security is our priority.
                </p>
              </div>
              
              <div className="text-center p-8 glass-morphism rounded-2xl hover:border-primary/30 transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-emerald-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <ArrowPathIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Easy Returns</h3>
                <p className="text-dark-text-secondary">
                  30-day money back guarantee. Hassle-free returns and exchanges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Browse our curated collections</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Electronics', 'Fashion', 'Home', 'Sports'].map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="group relative overflow-hidden rounded-2xl h-48 flex items-center justify-center bg-gradient-to-br from-dark-card to-dark-border border border-dark-border hover:border-primary transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-center p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{category}</h3>
                    <p className="text-dark-text-secondary text-sm">Shop Now →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;