import React from 'react';
import * as Sentry from '@sentry/react';

const PromiseErrors = () => {
  const triggerPromiseError = () => {
    // Promise that will reject
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Intentional Promise rejection for Sentry demo'));
      }, 1000);
    }).catch(error => {
      // Manually capture the error with context
      Sentry.captureException(error, {
        tags: {
          error_type: 'promise_rejection',
          handled: 'yes'
        }
      });
      
      alert('Error captured and sent to Sentry!');
    });
  };
  
  const triggerUnhandledPromiseError = () => {
    // This will cause an unhandled rejection
    // Which Sentry should catch automatically
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Unhandled Promise rejection for Sentry demo'));
      }, 1000);
    });
    
    alert('Unhandled rejection triggered - Sentry should catch this automatically');
  };
  
  const triggerAsyncError = async () => {
    try {
      await asyncFunctionWithError();
    } catch (error) {
      Sentry.captureException(error);
      alert('Async error captured and sent to Sentry!');
    }
  };
  
  const asyncFunctionWithError = async () => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Throw error in async function
    throw new Error('Error in async function for Sentry demo');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Promise & Async Errors Demo</h2>
        <p>
          Test how Sentry captures errors in Promises and async/await code.
        </p>
        
        <button onClick={triggerPromiseError} className="error-button">
          Trigger Handled Promise Error
        </button>
        
        <button onClick={triggerUnhandledPromiseError} className="error-button">
          Trigger Unhandled Promise Error
        </button>
        
        <button onClick={triggerAsyncError} className="error-button">
          Trigger Async/Await Error
        </button>
      </div>
    </div>
  );
};

export default PromiseErrors;