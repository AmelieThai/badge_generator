import React from 'react';
import './SliderControl.css';

function SliderControl({ value, onChange }) {
  return (
    <div className="slider-control">
      <label htmlFor="e_badge_slider">
        <span className="label-text">Épaisseur du badge (e_badge)</span>
        <span className="value-display">{value.toFixed(2)} mm</span>
      </label>
      <div className="slider-container">
        <span className="min-label">0.5</span>
        <input
          id="e_badge_slider"
          type="range"
          min="0.5"
          max="2.0"
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="slider"
        />
        <span className="max-label">2.0</span>
      </div>
    </div>
  );
}

export default SliderControl;
