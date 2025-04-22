# Sentry Demo Application - Setup Guide

This guide will walk you through setting up the Sentry demo application and ensuring your secrets are kept secure.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Sentry account (free tier works fine)

## Installation

1. **Clone the repository**
   ```
   git clone <your-repo-url>
   cd sentry-demo-app
   ```

2. **Install dependencies**
   ```
   npm run install-all
   ```
   This will install dependencies for the root project, client, and server.

## Configuring Sentry

1. **Create Sentry projects**:
   - Go to [Sentry](https://sentry.io/) and sign in or create an account
   - Create two projects:
     - A React/JavaScript project for the frontend
     - A Node.js project for the backend

2. **Configure environment variables**:
   
   For the server:
   - Create a copy of the example .env file:
     ```
     cp server/.env.example server/.env
     ```
   - Edit `server/.env` and add your Sentry DSN:
     ```
     PORT=5000
     SENTRY_DSN_SERVER=your_sentry_backend_dsn_here
     ```

   For the client:
   - Open `client/src/index.js`
   - Replace `YOUR_SENTRY_DSN_HERE` with your React project DSN

## Keeping Secrets Secure

1. **Environment Variables**:
   - All sensitive information should be stored in .env files
   - The .gitignore file is configured to exclude all .env files from git

2. **Best Practices**:
   - NEVER commit .env files to your repository
   - Consider using environment-specific .env files (.env.development, .env.production)
   - Use .env.example files with placeholder values as templates

3. **Additional Security Measures**:
   - Consider using a secrets manager for production deployments
   - Rotate your Sentry DSN keys periodically
   - Set up environment-based configuration in Sentry to separate dev/prod data

## Running the Application

1. **Start both frontend and backend**:
   ```
   npm run dev
   ```

2. **Run only the backend**:
   ```
   cd server
   npm run dev
   ```

3. **Run only the frontend**:
   ```
   cd client
   npm start
   ```

## Verifying the Setup

1. Open your browser to http://localhost:3000
2. Navigate to any of the error demo pages
3. Trigger an error
4. Check your Sentry dashboard to see the error appear

## Troubleshooting

- **Backend not connecting**: Check that your server/.env file exists and has the correct PORT
- **Errors not appearing in Sentry**: Verify your DSN values are correct and that you're not blocking the Sentry domains
- **Module not found errors**: Run `npm run install-all` again to ensure all dependencies are installed

## Production Deployment Considerations

For a production deployment, you would want to:

1. Set appropriate sample rates in Sentry to control volume
2. Use a separate Sentry project/environment for production
3. Configure proper release tracking with source maps
4. Set up performance monitoring thresholds