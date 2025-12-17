import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
        navigate('/');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Emporium - {isLogin ? 'Sign In' : 'Create Account'}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-dark-bg to-gray-900 py-12 px-4">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join Emporium'}
            </h1>
            <p className="text-dark-text-secondary">
              {isLogin ? 'Sign in to access your account' : 'Create your account to start shopping'}
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-morphism rounded-2xl p-8">
            {/* Toggle Switch */}
            <div className="flex mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-center font-medium rounded-l-lg transition-colors ${
                  isLogin 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-card text-dark-text-secondary hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-center font-medium rounded-r-lg transition-colors ${
                  !isLogin 
                    ? 'bg-primary text-white' 
                    : 'bg-dark-card text-dark-text-secondary hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      className="input-field pl-10"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-text-secondary" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="••••••••"
                    minLength="6"
                  />
                </div>
                {!isLogin && (
                  <p className="text-xs text-dark-text-secondary mt-2">
                    Must be at least 6 characters long
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center group"
              >
                {loading ? (
                  <>
                    <div className="spinner h-5 w-5 mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary-dark"
                    onClick={() => {
                      toast.success('Password reset email sent!');
                    }}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-dark-border">
              <p className="text-sm text-center text-dark-text-secondary">
                By continuing, you agree to our{' '}
                <Link to="https://youtu.be/dQw4w9WgXcQ" className="text-primary hover:text-primary-dark">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="https://youtu.be/dQw4w9WgXcQ" className="text-primary hover:text-primary-dark">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-dark-text-secondary hover:text-white transition-colors"
            >
              <ArrowRightIcon className="h-4 w-4 mr-2 rotate-180" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;