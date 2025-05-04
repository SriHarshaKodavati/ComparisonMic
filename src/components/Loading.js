import React from 'react';
import '../styles/Loading.css';

const Loading = ({ message = 'Processing image...' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
        <p className="loading-submessage">This may take a few moments</p>
      </div>
    </div>
  );
};

export default Loading;