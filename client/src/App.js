import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import Home from './components/Home';
import ErrorComponent from './components/ErrorComponent';
import ApiErrors from './components/ApiErrors';
import PromiseErrors from './components/PromiseErrors';

// Create a Sentry error boundary for the application
const SentryErrorBoundary = Sentry.withErrorBoundary(({ children }) => {
  return children;
}, {
  fallback: ({ error, componentStack, resetError }) => (
    <div className="container">
      <div className="card">
        <h2>Something went wrong!</h2>
        <p>Error: {error.toString()}</p>
        <pre>{componentStack}</pre>
        <button onClick={resetError} className="success-button">Try again</button>
      </div>
    </div>
  ),
});

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <h1>Sentry Demo Application</h1>
        </header>
        
        <nav className="nav">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/component-error" className="nav-item">Component Error</Link>
          <Link to="/api-errors" className="nav-item">API Errors</Link>
          <Link to="/promise-errors" className="nav-item">Promise Errors</Link>
        </nav>
        
        <SentryErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/component-error" element={<ErrorComponent />} />
            <Route path="/api-errors" element={<ApiErrors />} />
            <Route path="/promise-errors" element={<PromiseErrors />} />
          </Routes>
        </SentryErrorBoundary>
      </div>
    </Router>
  );
}

export default App;