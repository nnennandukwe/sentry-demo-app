import React, { useState } from 'react';

const ErrorComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  
  if (shouldThrow) {
    // This will be caught by the error boundary
    throw new Error('Intentional component error for Sentry demo');
  }
  
  const triggerRenderError = () => {
    setShouldThrow(true);
  };
  
  const triggerMethodError = () => {
    // Call a non-existent method
    const obj = null;
    obj.nonExistentMethod();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Component Error Demo</h2>
        <p>
          This component allows you to trigger errors that will be caught by 
          Sentry's React error boundary.
        </p>
        
        <button onClick={triggerRenderError} className="error-button">
          Trigger Render Error
        </button>
        
        <button onClick={triggerMethodError} className="error-button">
          Trigger Method Error
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;