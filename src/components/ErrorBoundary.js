/**
 * @file ErrorBoundary.js
 * @description Error boundary component for catching React errors
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 * @confidential This file contains proprietary information. Do not distribute.
 */

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state when error occurs
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  // Display error message or children
  render() {
    if (this.state.hasError) {
      return (
        // Error display screen
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold text-accent-3 mb-4">Something went wrong</h1>
            <p className="text-text mb-6">We're working on fixing this issue. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent-1 text-white px-6 py-3 rounded-lg hover:bg-accent-3 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;