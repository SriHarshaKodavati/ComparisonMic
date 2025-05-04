import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <FaExclamationTriangle />
          </div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>
          <Link to="/" className="btn btn-primary btn-icon">
            <FaHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;