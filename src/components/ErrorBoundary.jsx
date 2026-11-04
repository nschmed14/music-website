/**
 * @file ErrorBoundary.jsx
 * @copyright 2025 Noah Schmedding. All Rights Reserved.
 */

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-svh items-center justify-center bg-black p-4 text-center">
        <div className="max-w-md">
          <h1 className="mb-4 text-4xl">Something went wrong</h1>
          <p className="mb-6 text-gray-300">Please try refreshing the page.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg border border-white/30 px-6 py-3 transition-colors hover:bg-white/10"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}
