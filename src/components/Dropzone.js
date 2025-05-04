import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaFileImage } from 'react-icons/fa';
import '../styles/Dropzone.css';

const Dropzone = ({ onFileDrop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

      const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFileType(droppedFile)) {
      setFile(droppedFile);
      onFileDrop(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setFile(selectedFile);
      onFileDrop(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const isValidFileType = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff'];
    return validTypes.includes(file.type);
  };

  return (
    <div className="dropzone-container">
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          accept=".jpg,.jpeg,.png,.bmp,.tiff"
          onChange={handleFileSelect}
        />

        {!file ? (
          <div className="dropzone-content">
            <FaCloudUploadAlt className="upload-icon" />
            <h3>Drag & Drop your X-ray image here</h3>
            <p>or click to browse files</p>
            <p className="file-types">Supported formats: JPG, PNG, BMP, TIFF</p>
          </div>
        ) : (
          <div className="file-info">
            <FaFileImage className="file-icon" />
            <div className="file-details">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{formatFileSize(file.size)}</p>
            </div>
          </div>
        )}
      </div>

      {file && (
        <button 
          className="btn btn-primary btn-upload" 
          onClick={() => onFileDrop(file)}
        >
          Process Image
        </button>
      )}
    </div>
  );
};

export default Dropzone;