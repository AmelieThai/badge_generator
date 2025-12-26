import React from 'react';
import './PreviewPanel.css';

function PreviewPanel({ svgFile }) {
  const [previewUrl, setPreviewUrl] = React.useState(null);

  React.useEffect(() => {
    if (svgFile) {
      const url = URL.createObjectURL(svgFile);
      setPreviewUrl(url);
      
      // Cleanup
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [svgFile]);

  return (
    <div className="preview-panel">
      <h3 className="preview-title">Prévisualisation du SVG</h3>
      <div className="preview-container">
        {previewUrl ? (
          <div className="preview-content">
            <img src={previewUrl} alt="SVG Preview" className="svg-preview" />
          </div>
        ) : (
          <div className="preview-placeholder">
            <svg className="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Aucun fichier SVG sélectionné</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewPanel;
