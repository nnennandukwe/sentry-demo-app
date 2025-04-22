import React, { useState } from 'react';
import axios from 'axios';
import * as Sentry from '@sentry/react';

const ApiErrors = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const resetState = () => {
    setLoading(false);
    setResponse(null);
    setError(null);
  };

  const makeApiCall = async (endpoint) => {
    resetState();
    setLoading(true);
    
    try {
      const result = await axios.get(`/api/${endpoint}`);
      setResponse(result.data);
    } catch (err) {
      // Sentry will automatically capture this if unhandled
      // We're handling it to show the error UI
      setError(err.message || 'Unknown error occurred');
      
      // But we can also manually capture it with custom context
      Sentry.captureException(err, {
        tags: {
          api_endpoint: endpoint
        },
        extra: {
          response: err.response?.data
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>API Error Demo</h2>
        <p>
          Test how Sentry captures errors from API calls to our Express backend.
        </p>
        
        <div>
          <button onClick={() => makeApiCall('healthy')} className="success-button">
            Call Healthy Endpoint
          </button>
          
          <button onClick={() => makeApiCall('error')} className="error-button">
            Call Error Endpoint
          </button>
          
          <button onClick={() => makeApiCall('unhandled-error')} className="error-button">
            Call Unhandled Error Endpoint
          </button>
          
          <button onClick={() => makeApiCall('timeout')} className="error-button">
            Call Timeout Endpoint
          </button>
          
          <button onClick={() => makeApiCall('non-existent')} className="error-button">
            Call Non-existent Endpoint
          </button>
        </div>
        
        {loading && <p>Loading...</p>}
        
        {error && (
          <div style={{ color: 'red', marginTop: '15px' }}>
            <h3>Error:</h3>
            <p>{error}</p>
          </div>
        )}
        
        {response && (
          <div style={{ marginTop: '15px' }}>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiErrors;