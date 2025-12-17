import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import toast from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

toast.custom = (message, options = {}) => {
  return toast(message, {
    style: {
      background: '#1e293b',
      color: '#f1f5f9',
      border: '1px solid #334155',
    },
    ...options
  });
};