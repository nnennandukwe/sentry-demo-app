// Require instrument.js first!
require('./instrument');

const express = require('express');
const cors = require('cors');
const Sentry = require('@sentry/node');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/healthy', (req, res) => {
  res.json({ status: 'API is healthy' });
});

// Intentional error endpoint (for demonstration)
app.get('/api/error', (req, res) => {
  try {
    // Throw an intentional error to demonstrate Sentry
    throw new Error('This is an intentional server error for Sentry demo');
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'An intentional server error occurred' });
  }
});

// Unhandled error endpoint
app.get('/api/unhandled-error', (req, res) => {
  // This will crash without try/catch to show how Sentry captures unhandled errors
  const nonExistentVar = undefinedVariable.property;
  res.status(200).json({ result: nonExistentVar });
});

// Database timeout simulation
app.get('/api/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ message: 'Response after simulated delay' });
  }, 5000);
});

// Use the new setupExpressErrorHandler which replaces the previous
// requestHandler, tracingHandler, and errorHandler middleware
Sentry.setupExpressErrorHandler(app);

// Default error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});