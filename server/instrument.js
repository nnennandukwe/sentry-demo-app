const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

// Initialize Sentry - must be done before importing any other modules
Sentry.init({
  dsn: process.env.SENTRY_DSN_SERVER,
  integrations: [
    nodeProfilingIntegration(),
  ],
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/[^/]*\.sentry\.io/],
}); 