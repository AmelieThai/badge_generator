import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './SvgUploader.css';

function SvgUploader({ onFileSelected, selectedFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelected(file);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div className="svg-uploader">
      <label className="uploader-label">Fichier SVG personnalisé</label>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${selectedFile ? 'has-file' : ''}`}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="file-info">
            <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="file-name">{selectedFile.name}</p>
            <p className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            <p className="click-to-change">Cliquez ou glissez pour changer</p>
          </div>
        ) : isDragActive ? (
          <div className="drop-message">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p>Déposez le fichier SVG ici...</p>
          </div>
        ) : (
          <div className="upload-message">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="primary-text">Glissez et déposez un fichier SVG</p>
            <p className="secondary-text">ou cliquez pour sélectionner</p>
            <p className="size-limit">Maximum 5 MB</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SvgUploader;
