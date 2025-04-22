import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { browserTracingIntegration, replayIntegration } from '@sentry/browser';
import App from './App';
import './index.css';

// Initialize Sentry for React
Sentry.init({
  dsn: "https://888d47a4e3e24b63d7b7a8b43094b782@o4509197854834688.ingest.us.sentry.io/4509197991477248", // Replace with your actual DSN
  integrations: [browserTracingIntegration(), replayIntegration()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0,
  beforeSend(event) {
    // Check if it's a network error or similar that should be reported
    if (event.exception) {
      console.log("Sending error to Sentry:", event);
    }
    return event;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);