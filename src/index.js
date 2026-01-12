/**
 * @file index.js
 * @description Entry point for the React application
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Create root element for React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);