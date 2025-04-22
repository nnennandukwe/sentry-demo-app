import React from 'react';
import * as Sentry from '@sentry/react';

const Home = () => {
  const testSentryManualCapture = () => {
    try {
      // Manually capture a message
      Sentry.captureMessage("This is a test message sent to Sentry!", "info");
      alert("Test message sent to Sentry!");
    } catch (error) {
      console.error("Failed to send test message:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to the Sentry Demo App</h2>
        <p>
          This application demonstrates Sentry error monitoring capabilities by 
          intentionally generating various types of errors that Sentry can capture.
        </p>
        
        <h3>Features:</h3>
        <ul>
          <li>Component errors with React Error Boundaries</li>
          <li>API errors from the Express backend</li>
          <li>Unhandled Promise rejections</li>
          <li>Manual error and message capture</li>
        </ul>
        
        <button onClick={testSentryManualCapture} className="success-button">
          Test Sentry Manual Capture
        </button>
      </div>
    </div>
  );
};

export default Home;