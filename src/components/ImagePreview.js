import React, { useState, useEffect } from 'react';
import { FaFileImage } from 'react-icons/fa';
import '../styles/ImagePreview.css';

const ImagePreview = ({ imageUrl, imageName }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setLoading(true);
      setError(false);
    }
  }, [imageUrl]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  if (!imageUrl) {
    return (
      <div className="image-preview-container">
        <div className="image-placeholder">
          <FaFileImage className="placeholder-icon" />
          <p>No image uploaded</p>
          <p className="placeholder-subtext">Upload an X-ray image to see preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="image-preview-container">
      {loading && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
          <p>Loading image...</p>
        </div>
      )}
      
      {error && (
        <div className="image-error">
          <FaFileImage className="error-icon" />
          <p>Failed to load image</p>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={imageName || "X-ray image"}
        className={`image-preview ${loading || error ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {imageName && !loading && !error && (
        <div className="image-caption">
          {imageName}
        </div>
      )}
    </div>
  );
};

export default ImagePreview;