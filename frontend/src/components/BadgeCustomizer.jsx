import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SliderControl from './SliderControl';
import SvgUploader from './SvgUploader';
import PreviewPanel from './PreviewPanel';
import './BadgeCustomizer.css';

function BadgeCustomizer() {
  const [eBadge, setEBadge] = useState(0.76);
  const [svgFile, setSvgFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [backendStatus, setBackendStatus] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const response = await axios.get('/api/health');
      setBackendStatus(response.data);
    } catch (err) {
      setBackendStatus({ status: 'error', openscad_available: false });
    }
  };

  const handleGenerate = async () => {
    // Reset states
    setError(null);
    setSuccess(false);

    // Validate inputs
    if (!svgFile) {
      setError('Veuillez sélectionner un fichier SVG');
      return;
    }

    if (eBadge < 0.5 || eBadge > 2.0) {
      setError('La valeur e_badge doit être entre 0.5 et 2.0');
      return;
    }

    setIsGenerating(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('e_badge', eBadge.toString());
      formData.append('svg_file', svgFile);

      // Make API request
      const response = await axios.post('/api/generate', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `badge_${Date.now()}.3mf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      if (err.response && err.response.data) {
        // Try to parse error from blob
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            setError(errorData.error || 'Erreur lors de la génération du badge');
          } catch {
            setError('Erreur lors de la génération du badge');
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setError(err.message || 'Erreur de connexion au serveur');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = svgFile && !isGenerating && backendStatus?.openscad_available;

  return (
    <div className="badge-customizer">
      <div className="customizer-card">
        {backendStatus && !backendStatus.openscad_available && (
          <div className="alert alert-warning">
            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong>OpenSCAD n'est pas disponible</strong>
              <p>Veuillez installer OpenSCAD CLI pour pouvoir générer des badges.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Badge généré avec succès ! Le téléchargement a commencé.</span>
          </div>
        )}

        <SliderControl value={eBadge} onChange={setEBadge} />

        <SvgUploader 
          onFileSelected={setSvgFile}
          selectedFile={svgFile}
        />

        <PreviewPanel svgFile={svgFile} />

        <button
          className={`generate-button ${!canGenerate ? 'disabled' : ''}`}
          onClick={handleGenerate}
          disabled={!canGenerate}
        >
          {isGenerating ? (
            <>
              <div className="spinner"></div>
              <span>Génération en cours...</span>
            </>
          ) : (
            <>
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Générer le badge 3MF</span>
            </>
          )}
        </button>

        {!svgFile && (
          <p className="help-text">
            💡 Sélectionnez d'abord un fichier SVG pour activer la génération
          </p>
        )}
      </div>
    </div>
  );
}

export default BadgeCustomizer;
