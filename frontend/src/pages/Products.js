import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const { API } = useAuth();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await addToCart(productId);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const maxPrice = Math.max(...products.map(p => p.price), 5000);

  return (
    <>
      <Helmet>
        <title>Emporium - Products</title>
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Our Collection</h1>
            <p className="text-dark-text-secondary">
              Discover premium products curated just for you
            </p>
          </div>

          <div className="glass-morphism rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>


              <div className="lg:w-64">
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-field pl-10 appearance-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              <div className="lg:w-64">
                <div className="relative">
                  <AdjustmentsHorizontalIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field pl-10 appearance-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

  
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-dark-text-secondary">Price Range</span>
                <span className="text-primary font-bold">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>


          <div className="flex justify-between items-center mb-6">
            <p className="text-dark-text-secondary">
              Showing <span className="text-white font-semibold">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                  setSortBy('newest');
                  setPriceRange([0, maxPrice]);
                }}
                className="text-sm text-primary hover:text-primary-dark"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner h-12 w-12"></div>
            </div>
          ) : (
            <>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="group">
                    <div className="product-card h-full flex flex-col">
                      <Link to={`/products/${product._id}`} className="block overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image"
                        />
                      </Link>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/products/${product._id}`}>
                            <h3 className="product-title group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                            {product.stock > 0 ? `${product.stock} left` : 'Sold Out'}
                          </span>
                        </div>
                        <p className="product-description mb-4 flex-grow">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="product-price">
                            ${product.price.toFixed(2)}
                          </span>
                          <div className="flex space-x-2">
                            <Link
                              to={`/products/${product._id}`}
                              className="btn-secondary px-3 py-1 text-sm"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleAddToCart(product._id)}
                              disabled={product.stock === 0}
                              className="btn-primary px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-16 glass-morphism rounded-2xl">
                  <div className="w-24 h-24 mx-auto mb-6 bg-dark-border rounded-full flex items-center justify-center">
                    <MagnifyingGlassIcon className="h-12 w-12 text-dark-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                  <p className="text-dark-text-secondary mb-6">
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategory('all');
                      setSortBy('newest');
                      setPriceRange([0, maxPrice]);
                    }}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
