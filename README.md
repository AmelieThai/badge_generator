# 🎯 Badge Generator - Générateur de Badges 3D Personnalisés

Application web complète pour générer des badges personnalisés imprimables en 3D au format 3MF. Personnalisez l'épaisseur du badge et intégrez votre propre logo SVG.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![OpenSCAD](https://img.shields.io/badge/openscad-required-orange.svg)

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [API Documentation](#api-documentation)
- [Structure du projet](#structure-du-projet)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [Troubleshooting](#troubleshooting)
- [Contribuer](#contribuer)

## 🎨 Aperçu

Badge Generator est une application web full-stack qui permet aux utilisateurs de créer des badges personnalisés pour l'impression 3D. L'application génère des fichiers 3MF prêts à imprimer avec:

- ✅ Ajustement de l'épaisseur du badge (0.5mm à 2.0mm)
- ✅ Intégration de logos SVG personnalisés
- ✅ Interface utilisateur intuitive avec drag & drop
- ✅ Prévisualisation en temps réel
- ✅ Téléchargement automatique du fichier 3MF généré
- ✅ Historique des générations sauvegardé

## ✨ Fonctionnalités

### Frontend (React)
- 🎚️ **Slider interactif** pour ajuster `e_badge` (épaisseur du badge)
- 📤 **Drag & Drop** pour uploader des fichiers SVG
- 👁️ **Prévisualisation instantanée** du SVG uploadé
- 📱 **Interface responsive** compatible mobile et desktop
- ⚡ **Feedback en temps réel** (loading states, messages d'erreur/succès)
- 🎨 **Design moderne** avec animations fluides

### Backend (Python Flask)
- 🔌 **API REST** avec validation complète des entrées
- 🛠️ **Génération dynamique** de fichiers OpenSCAD
- 🔄 **Conversion automatique** .scad → .3mf via OpenSCAD CLI
- 💾 **Stockage de l'historique** des générations
- 🧹 **Gestion automatique** des fichiers temporaires
- 🔒 **Validation stricte** des fichiers et paramètres

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│                 │  HTTP   │                  │ CLI     │             │
│  React Frontend │ ◄─────► │  Flask Backend   │ ◄─────► │  OpenSCAD   │
│  (Port 3000)    │         │  (Port 5000)     │         │             │
└─────────────────┘         └──────────────────┘         └─────────────┘
       │                            │
       │                            │
       ▼                            ▼
  Utilisateur                 generations/
                              ├── {timestamp}_params.json
                              ├── {timestamp}_input.svg
                              ├── {timestamp}_badge.scad
                              └── {timestamp}_output.3mf
```

### Technologies utilisées

**Frontend:**
- React 18.2
- Axios (HTTP client)
- React Dropzone (file upload)
- CSS3 moderne

**Backend:**
- Python 3.8+
- Flask 3.0 (API REST)
- Flask-CORS (gestion CORS)
- OpenSCAD CLI (génération 3D)

## 📦 Prérequis

### Système
- **Node.js** 14+ et npm 6+
- **Python** 3.8+
- **OpenSCAD CLI** installé et accessible dans PATH

### Installation d'OpenSCAD

**Linux (Debian/Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install openscad
```

**macOS:**
```bash
brew install openscad
```

**Windows:**
Télécharger depuis [OpenSCAD.org](https://openscad.org/downloads.html) et ajouter au PATH.

**Vérification:**
```bash
openscad --version
```

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/AmelieThai/badge_generator.git
cd badge_generator
```

### 2. Installation du Backend

```bash
cd backend

# Créer un environnement virtuel
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt
```

### 3. Installation du Frontend

```bash
cd frontend

# Installer les dépendances
npm install
```

## 🎯 Utilisation

### Démarrage rapide

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
```
Le backend démarre sur `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Le frontend s'ouvre automatiquement sur `http://localhost:3000`

### Guide d'utilisation

1. **Ajuster l'épaisseur** : Utilisez le slider pour définir `e_badge` (0.5 - 2.0 mm)
2. **Uploader le SVG** : Glissez-déposez ou cliquez pour sélectionner votre fichier SVG
3. **Prévisualiser** : Vérifiez que votre SVG s'affiche correctement
4. **Générer** : Cliquez sur "Générer le badge 3MF"
5. **Télécharger** : Le fichier 3MF se télécharge automatiquement

### Exemple avec curl

```bash
curl -X POST http://localhost:5000/api/generate \
  -F "e_badge=0.76" \
  -F "svg_file=@my_logo.svg" \
  -o badge.3mf
```

## 📡 API Documentation

### Health Check

**Endpoint:** `GET /api/health`

**Description:** Vérifie la disponibilité du serveur et d'OpenSCAD.

**Réponse:**
```json
{
  "status": "healthy",
  "openscad_available": true,
  "openscad_path": "/usr/bin/openscad"
}
```

**Status codes:**
- `200` - Service opérationnel
- `503` - OpenSCAD non disponible

### Generate Badge

**Endpoint:** `POST /api/generate`

**Description:** Génère un fichier 3MF de badge personnalisé.

**Paramètres:**
- `e_badge` (form field) - Float entre 0.5 et 2.0
- `svg_file` (file) - Fichier SVG (max 5MB)

**Réponse:** Fichier binaire 3MF

**Codes d'erreur:**
- `400` - Paramètres invalides
- `500` - Erreur de génération
- `503` - OpenSCAD non disponible

## 📁 Structure du projet

```
badge_generator/
├── README.md                    # Documentation principale
├── .gitignore                   # Fichiers ignorés par Git
│
├── backend/                     # Backend Flask
│   ├── app.py                   # Application Flask principale
│   ├── badge_template.scad      # Template OpenSCAD paramétrable
│   ├── requirements.txt         # Dépendances Python
│   ├── README.md               # Documentation backend
│   └── generations/            # Historique des générations
│       ├── {timestamp}_params.json
│       ├── {timestamp}_input.svg
│       ├── {timestamp}_badge.scad
│       └── {timestamp}_output.3mf
│
└── frontend/                    # Frontend React
    ├── public/
    │   └── index.html          # Template HTML
    ├── src/
    │   ├── components/
    │   │   ├── BadgeCustomizer.jsx      # Composant principal
    │   │   ├── BadgeCustomizer.css
    │   │   ├── SliderControl.jsx        # Contrôle du slider
    │   │   ├── SliderControl.css
    │   │   ├── SvgUploader.jsx          # Upload SVG
    │   │   ├── SvgUploader.css
    │   │   ├── PreviewPanel.jsx         # Prévisualisation
    │   │   └── PreviewPanel.css
    │   ├── App.js              # Composant racine
    │   ├── App.css
    │   ├── index.js            # Point d'entrée
    │   └── index.css
    ├── package.json            # Dépendances Node
    └── README.md               # Documentation frontend
```

## 🛠️ Développement

### Variables d'environnement

**Backend (.env):**
```bash
OPENSCAD_PATH=/usr/bin/openscad
PORT=5000
MAX_FILE_SIZE=5242880  # 5MB
```

**Frontend (.env.local):**
```bash
REACT_APP_API_URL=http://localhost:5000
```

### Commandes utiles

**Backend:**
```bash
# Lancer en mode debug
python app.py

# Tester l'API
curl http://localhost:5000/api/health
```

**Frontend:**
```bash
# Mode développement
npm start

# Build production
npm run build

# Tests
npm test
```

### Workflow de développement

1. Créer une branche feature: `git checkout -b feature/ma-feature`
2. Faire vos modifications
3. Tester localement (backend + frontend)
4. Commit: `git commit -m "Description"`
5. Push: `git push origin feature/ma-feature`
6. Créer une Pull Request

## 🚢 Déploiement

### Backend (Production)

**Avec Gunicorn:**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

**Avec Docker:**
```dockerfile
FROM python:3.9-slim
RUN apt-get update && apt-get install -y openscad
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

### Frontend (Production)

**Build:**
```bash
cd frontend
npm run build
```

**Déployer sur Netlify/Vercel:**
1. Connecter le repository
2. Build command: `npm run build`
3. Publish directory: `build`

**Serveur statique (nginx):**
```nginx
server {
    listen 80;
    root /var/www/badge-generator/build;
    
    location / {
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

## 🔧 Troubleshooting

### OpenSCAD non trouvé

**Problème:** `OpenSCAD is not available`

**Solution:**
```bash
# Vérifier l'installation
which openscad

# Si non trouvé, installer
sudo apt-get install openscad  # Linux
brew install openscad          # macOS

# Définir le chemin manuellement
export OPENSCAD_PATH=/path/to/openscad
```

### Erreur CORS

**Problème:** Requêtes bloquées par CORS

**Solution:** Vérifier que `flask-cors` est installé et configuré dans `app.py`

### Port déjà utilisé

**Backend:**
```bash
PORT=5001 python app.py
```

**Frontend:**
```bash
PORT=3001 npm start
```

### Module non trouvé (Frontend)

```bash
rm -rf node_modules package-lock.json
npm install
```

### Fichier 3MF vide ou corrompu

**Causes possibles:**
- OpenSCAD non installé ou version incorrecte
- SVG invalide ou trop complexe
- Timeout dépassé (fichier volumineux)

**Solutions:**
- Vérifier la version d'OpenSCAD: `openscad --version` (≥ 2019.05)
- Simplifier le SVG
- Augmenter le timeout dans `app.py`

## 📈 Limitations connues

- Taille maximale des fichiers SVG: 5MB
- Temps de génération: 10-60 secondes selon la complexité
- Format de sortie: 3MF uniquement (STL disponible en modifiant l'extension)
- Un seul SVG par badge

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines

- Suivre les conventions de code existantes
- Ajouter des tests si nécessaire
- Mettre à jour la documentation
- Tester avant de soumettre

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **AmelieThai** - [GitHub Profile](https://github.com/AmelieThai)

## 🙏 Remerciements

- [OpenSCAD](https://openscad.org/) pour le moteur de rendu 3D
- [React](https://react.dev/) pour le framework frontend
- [Flask](https://flask.palletsprojects.com/) pour le framework backend
- Tous les contributeurs qui améliorent ce projet

## 📞 Support

- 🐛 **Issues:** [GitHub Issues](https://github.com/AmelieThai/badge_generator/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/AmelieThai/badge_generator/discussions)
- 📧 **Email:** Voir le profil GitHub

---

⭐ Si ce projet vous est utile, n'hésitez pas à lui donner une étoile sur GitHub !
