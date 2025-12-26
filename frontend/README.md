# Badge Generator Frontend

Interface utilisateur React pour le générateur de badges 3D personnalisés.

## Fonctionnalités

- 🎚️ **Slider interactif** pour ajuster l'épaisseur du badge (e_badge: 0.5-2.0mm)
- 📤 **Drag & Drop** pour uploader des fichiers SVG
- 👁️ **Prévisualisation** du SVG uploadé
- ⚡ **Génération instantanée** et téléchargement automatique du fichier 3MF
- 📱 **Interface responsive** adaptée mobile et desktop
- 🎨 **Design moderne** avec animations fluides

## Prérequis

- Node.js 14 ou supérieur
- npm 6 ou supérieur

## Installation

1. Installer les dépendances:
```bash
npm install
```

2. Configurer l'URL de l'API backend (optionnel):

Par défaut, le frontend utilise un proxy configuré dans `package.json` qui redirige `/api/*` vers `http://localhost:5000`.

Pour changer l'URL du backend, vous pouvez:

**Option 1: Utiliser le proxy (recommandé pour développement)**
Modifier `package.json`:
```json
{
  "proxy": "http://localhost:5000"
}
```

**Option 2: Variables d'environnement**
Créer un fichier `.env.local`:
```bash
REACT_APP_API_URL=http://localhost:5000
```

Puis modifier le code pour utiliser `process.env.REACT_APP_API_URL`.

## Scripts disponibles

### `npm start`

Lance l'application en mode développement.
Ouvre [http://localhost:3000](http://localhost:3000) dans le navigateur.

La page se recharge automatiquement lors des modifications.
Les erreurs de lint s'affichent dans la console.

### `npm run build`

Compile l'application pour la production dans le dossier `build/`.
Optimise React pour les meilleures performances.

Les fichiers sont minifiés et les noms de fichiers incluent des hashes.
L'application est prête à être déployée !

### `npm test`

Lance les tests en mode watch interactif.

### `npm run eject`

⚠️ **Opération irréversible !**

Éjecte la configuration create-react-app pour un contrôle total.
Utile uniquement si vous avez besoin de personnaliser la configuration webpack.

## Structure du projet

```
frontend/
├── public/
│   └── index.html          # Template HTML principal
├── src/
│   ├── components/
│   │   ├── BadgeCustomizer.jsx      # Composant principal
│   │   ├── BadgeCustomizer.css
│   │   ├── SliderControl.jsx        # Slider pour e_badge
│   │   ├── SliderControl.css
│   │   ├── SvgUploader.jsx          # Upload de fichier SVG
│   │   ├── SvgUploader.css
│   │   ├── PreviewPanel.jsx         # Prévisualisation du SVG
│   │   └── PreviewPanel.css
│   ├── App.js              # Composant racine
│   ├── App.css
│   ├── index.js            # Point d'entrée React
│   └── index.css           # Styles globaux
├── package.json
└── README.md
```

## Composants

### BadgeCustomizer
Composant principal qui orchestre toute l'application:
- Gère l'état de l'application (e_badge, fichier SVG, erreurs, etc.)
- Communique avec l'API backend
- Gère le téléchargement du fichier 3MF généré
- Affiche les messages de succès/erreur

### SliderControl
Contrôle de slider pour ajuster e_badge:
- Range: 0.5 à 2.0
- Step: 0.01
- Affichage de la valeur en temps réel

### SvgUploader
Zone de drag & drop pour uploader des fichiers SVG:
- Supporte le drag & drop
- Validation du type de fichier (.svg uniquement)
- Limite de taille: 5MB
- Affichage des informations du fichier sélectionné

### PreviewPanel
Prévisualisation du fichier SVG uploadé:
- Affichage de l'image SVG
- Placeholder quand aucun fichier n'est sélectionné

## API Backend

L'application communique avec le backend via deux endpoints:

### GET /api/health
Vérifie la disponibilité du serveur et d'OpenSCAD.

### POST /api/generate
Génère le fichier 3MF du badge.

**Paramètres:**
- `e_badge`: float (0.5-2.0)
- `svg_file`: fichier SVG

**Réponse:** Fichier 3MF en téléchargement

## Dépendances principales

- **react**: Bibliothèque UI
- **react-dom**: Rendu React dans le DOM
- **axios**: Client HTTP pour les appels API
- **react-dropzone**: Composant drag & drop pour upload de fichiers
- **react-scripts**: Scripts et configuration create-react-app

## Développement

### Démarrage rapide

1. Démarrer le backend (dans un terminal séparé):
```bash
cd ../backend
python app.py
```

2. Démarrer le frontend:
```bash
npm start
```

3. Ouvrir http://localhost:3000

### Hot Reload

Le serveur de développement supporte le hot reload:
- Modifications CSS: rechargement instantané
- Modifications JS/JSX: rechargement automatique du composant
- Erreurs de compilation: affichées dans le navigateur et la console

### ESLint

Les règles ESLint sont configurées via `eslintConfig` dans `package.json`.
Les erreurs de lint s'affichent pendant le développement.

## Build de production

```bash
npm run build
```

Génère une version optimisée dans le dossier `build/`:
- Minification du code
- Optimisation des bundles
- Noms de fichiers avec hashes pour le cache
- Source maps pour le debugging

### Servir le build en local

```bash
npm install -g serve
serve -s build -l 3000
```

## Déploiement

### Netlify / Vercel

1. Connecter le repository GitHub
2. Configurer:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Environment variable: `REACT_APP_API_URL` (si nécessaire)

### Serveur statique

Copier le contenu du dossier `build/` sur votre serveur web.

Configuration nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

## Troubleshooting

### Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur CORS
Vérifier que le backend a `flask-cors` installé et configuré.

### Échec de connexion au backend
- Vérifier que le backend est démarré sur le port 5000
- Vérifier la configuration du proxy dans `package.json`
- Ouvrir la console développeur pour voir les erreurs réseau

### Port 3000 déjà utilisé
Définir un port différent:
```bash
PORT=3001 npm start
```

## Personnalisation

### Couleurs
Les couleurs principales sont définies dans les fichiers CSS:
- Violet primaire: `#667eea`
- Violet secondaire: `#764ba2`

Pour changer, remplacer dans tous les fichiers CSS.

### Limites de fichier
Modifier dans `SvgUploader.jsx`:
```javascript
maxSize: 5 * 1024 * 1024  // 5MB
```

### Valeurs par défaut
Modifier dans `BadgeCustomizer.jsx`:
```javascript
const [eBadge, setEBadge] = useState(0.76);  // Valeur par défaut
```

## Support des navigateurs

- Chrome/Edge (dernières 2 versions)
- Firefox (dernières 2 versions)
- Safari (dernières 2 versions)
- iOS Safari (dernières 2 versions)

## License

Voir LICENSE à la racine du projet.
