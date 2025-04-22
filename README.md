# Sentry Demo Application

This is a demo app showcasing Sentry error monitoring integration with a React frontend and Express backend.

![Sentry Demo App screenshot](/assets/Sentry_Demo_App.png)

## Features

- React frontend with error boundaries and Sentry integration
- Express backend with Sentry middleware
- Multiple error types for demonstration:
  - React component errors
  - API/Network errors
  - Promise/async rejections
  - Manual error reporting

## Setup

1. **Clone the repository**

   ```
   git clone https://github.com/nnennandukwe/sentry-demo-app.git
   cd sentry-demo-app
   ```

2. **Install dependencies**

   ```
   npm run install-all
   ```

3. **Set up Sentry**

   - Create a Sentry account at https://sentry.io if you don't have one
   - Create two projects: one for React (Browser JavaScript) and one for Node.js
   - Get your DSNs for both projects

4. **Configure environment variables**
   - In `/server/.env`: Replace `SENTRY_DSN_SERVER` with your Node.js project DSN
   - In `/client/src/index.js`: Replace `YOUR_SENTRY_DSN_HERE` with your React project DSN

## Running the app

```
npm run dev
```

This will start both the client and server:

- Client: http://localhost:3000
- Server: http://localhost:5000

## Demo Error Types

1. **Component Errors**

   - Render errors (triggered during React rendering)
   - Method errors (null object reference)

2. **API Errors**

   - Handled server errors
   - Unhandled server errors
   - Non-existent endpoints
   - Timeouts

3. **Promise/Async Errors**
   - Handled Promise rejections
   - Unhandled Promise rejections
   - Errors in async/await functions

## Monitoring Results

After triggering errors, visit your Sentry dashboard to see:

- Error details and stack traces
- User context and breadcrumbs
- Performance metrics
- Session replay (if enabled)

## Notes for Sentry Demo

This application intentionally generates errors to demonstrate Sentry's capabilities. Here are some key aspects:

1. **Automatic vs Manual Error Capturing**

   - Show how some errors are automatically captured
   - Demonstrate adding context and tags to manual captures

2. **Error Grouping and Filtering**

   - Trigger the same error multiple times to show how Sentry groups them
   - Use the search and filter features in the Sentry dashboard

3. **Performance Monitoring**

   - Show transaction traces from API calls
   - Discuss how performance data integrates with error monitoring

4. **Customization and Integration**

   - Point out the custom error boundary UI
   - Discuss how Sentry can integrate with other tools (Slack, JIRA, etc.)

5. **Debug Information**
   - Show source maps integration for readable stack traces
   - Discuss release tracking capabilities
