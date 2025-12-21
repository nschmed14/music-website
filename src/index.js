/**
 * @file index.js
 * @description Entry point for the React application
 * @copyright 2024 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);