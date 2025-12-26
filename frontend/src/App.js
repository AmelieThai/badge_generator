import React from 'react';
import './App.css';
import BadgeCustomizer from './components/BadgeCustomizer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎯 Générateur de Badges 3D</h1>
        <p>Personnalisez votre badge avec votre logo SVG</p>
      </header>
      <main className="App-main">
        <BadgeCustomizer />
      </main>
      <footer className="App-footer">
        <p>Généré avec OpenSCAD | Format de sortie: 3MF</p>
      </footer>
    </div>
  );
}

export default App;
