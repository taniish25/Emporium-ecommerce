// API Configuration
const getApiBaseUrl = () => {
  // Check for environment variable first
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Fallback based on NODE_ENV
  return process.env.NODE_ENV === 'production'
    ? 'https://emporium-ecommerce-backend.onrender.com/api'
    : 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;