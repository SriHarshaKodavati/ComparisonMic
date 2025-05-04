// src/components/ImageUploader.js
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaImage, FaTimesCircle } from 'react-icons/fa';

const ImageUploader = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidImageFile(file)) {
        processFile(file);
      }
    }
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidImageFile(file)) {
        processFile(file);
      }
    }
  };
  
  const handleClick = () => {
    inputRef.current.click();
  };
  
  const processFile = (file) => {
    setSelectedImage(file);
    onImageUpload(file);
  };
  
  const removeImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
    onImageUpload(null);
  };
  
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    return validTypes.includes(file.type);
  };
  
  return (
    <div className="image-uploader">
      <motion.div 
        className={`dropzone ${dragActive ? 'active' : ''} ${selectedImage ? 'has-image' : ''}`}
        onDragEnter={handleDrag}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        {selectedImage ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
            <button className="remove-button" onClick={removeImage}>
              <FaTimesCircle />
            </button>
          </div>
        ) : (
          <div className="upload-message">
            <div className="upload-icon">
              <FaImage />
            </div>
            <p>Drag & drop an X-ray image here or click to browse</p>
            <span>Supports: JPG, PNG, GIF</span>
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          className="input-file"
          accept="image/*"
          onChange={handleChange}
        />
      </motion.div>
      
      {dragActive && (
        <div 
          className="drag-overlay"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
};

export default ImageUploader;