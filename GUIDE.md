# 🎯 Badge Generator - Guide d'utilisation

Ce guide vous accompagne pas à pas pour créer votre premier badge personnalisé.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :

- ✅ Python 3.8+ installé
- ✅ Node.js 14+ installé
- ✅ OpenSCAD CLI installé (voir [README.md](README.md) pour l'installation)
- ✅ Un fichier SVG de votre logo (max 5MB)

## 🚀 Démarrage rapide

### 1. Installation

```bash
# Cloner le repository
git clone https://github.com/AmelieThai/badge_generator.git
cd badge_generator

# Installation backend
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..

# Installation frontend
cd frontend
npm install
cd ..
```

### 2. Lancement de l'application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
```

Vous devriez voir :
```
Starting Badge Generator Backend on port 5000
OpenSCAD path: openscad
Generations directory: .../backend/generations
✓ OpenSCAD is available
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

L'application s'ouvre automatiquement dans votre navigateur sur `http://localhost:3000`.

## 🎨 Utilisation de l'interface

### Étape 1 : Ajuster l'épaisseur du badge

![Slider Control](docs/images/slider.png)

- Utilisez le **slider** pour ajuster la valeur `e_badge`
- Plage : 0.5mm à 2.0mm
- Valeur par défaut recommandée : **0.76mm**
- La valeur s'affiche en temps réel dans une bulle colorée

**Conseil :** 
- 0.5-0.8mm : Badge léger et flexible
- 0.8-1.2mm : Badge standard, bonne rigidité
- 1.2-2.0mm : Badge épais et très solide

### Étape 2 : Uploader votre logo SVG

![SVG Upload](docs/images/upload.png)

Deux méthodes pour uploader :

**Méthode 1 - Drag & Drop :**
1. Glissez votre fichier SVG depuis votre explorateur
2. Déposez-le dans la zone de téléchargement
3. ✅ Le fichier est instantanément chargé

**Méthode 2 - Sélection :**
1. Cliquez sur la zone de téléchargement
2. Naviguez jusqu'à votre fichier SVG
3. Sélectionnez et validez

**Format accepté :**
- Extension : `.svg` uniquement
- Taille maximum : 5MB
- Recommandation : SVG simple avec peu de détails complexes

### Étape 3 : Prévisualisation

![Preview](docs/images/preview.png)

La zone de prévisualisation affiche votre SVG :
- Vérifiez que votre logo s'affiche correctement
- Le logo sera intégré au centre du badge
- Il sera redimensionné automatiquement à 55mm de hauteur

### Étape 4 : Génération du badge

![Generate Button](docs/images/generate.png)

1. Cliquez sur **"Générer le badge 3MF"**
2. Attendez la génération (10-60 secondes selon la complexité)
3. Le fichier 3MF se télécharge automatiquement

**Pendant la génération :**
- Le bouton affiche un spinner 🔄
- Ne fermez pas la fenêtre
- Patientez jusqu'à la fin du téléchargement

**Messages possibles :**
- ✅ **Succès** : "Badge généré avec succès !"
- ❌ **Erreur** : Vérifiez les paramètres et réessayez
- ⚠️ **OpenSCAD indisponible** : Installez OpenSCAD CLI

## 📐 Dimensions du badge

Le badge généré a les dimensions suivantes :

```
Hauteur : 96mm
Largeur : 59mm
Rayon des coins : 6mm
Épaisseur de base : 1.5mm
Épaisseur badge : e_badge (ajustable)
```

Le logo SVG :
- Hauteur finale : 55mm
- Centré sur le badge
- Profondeur : 0.5mm

## 🖨️ Impression 3D

### Préparation du fichier

1. Ouvrez le fichier `.3mf` dans votre slicer (PrusaSlicer, Cura, etc.)
2. Le fichier contient déjà les couleurs (rouge et jaune)
3. Vérifiez l'orientation sur le plateau

### Paramètres d'impression recommandés

**Matériau :**
- PLA : ✅ Excellent choix, facile à imprimer
- PETG : ✅ Plus résistant, bon pour usage quotidien
- ABS : ⚠️ Possible mais plus difficile
- TPU : ❌ Non recommandé (trop souple)

**Paramètres :**
```
Hauteur de couche : 0.2mm
Remplissage : 20%
Vitesse : 50mm/s
Support : Non nécessaire
Adhésion : Optionnel (brim recommandé)
```

**Impression multi-couleur :**
- Pause à la couche du logo
- Changer de filament pour le logo
- Reprendre l'impression

### Temps d'impression estimé

- Badge simple : 1h30 - 2h00
- Badge détaillé : 2h00 - 3h00
- Dépend de la vitesse de votre imprimante

## 💡 Exemples de badges

### Badge entreprise

```
e_badge: 0.8mm
Logo: Logo de l'entreprise en SVG
Utilisation: Identification du personnel
```

### Badge événement

```
e_badge: 0.6mm (léger)
Logo: Logo de l'événement
Utilisation: Participants à une conférence
```

### Badge personnalisé

```
e_badge: 1.0mm
Logo: Initiales ou icône personnalisée
Utilisation: Badge nominatif
```

## 🔧 Problèmes courants

### Le SVG ne s'affiche pas correctement

**Causes possibles :**
- SVG trop complexe
- Effets spéciaux non supportés (ombres, flous)
- Texte non converti en chemin

**Solution :**
1. Ouvrez le SVG dans Inkscape
2. Menu : Chemin → Objet en chemin
3. Simplifiez les formes complexes
4. Exportez en SVG simple

### La génération échoue

**Vérifications :**
1. OpenSCAD est-il installé ?
   ```bash
   openscad --version
   ```
2. Le fichier SVG est-il valide ?
   - Ouvrez-le dans un navigateur
   - Vérifiez qu'il s'affiche
3. Les paramètres sont-ils dans les limites ?
   - e_badge : 0.5 - 2.0
   - Taille SVG : < 5MB

### Le téléchargement ne démarre pas

**Solutions :**
1. Vérifiez que le popup n'est pas bloqué
2. Regardez dans les téléchargements du navigateur
3. Essayez avec un autre navigateur

### OpenSCAD n'est pas disponible

**Message d'erreur :**
```
⚠️ OpenSCAD n'est pas disponible
```

**Solution :**
```bash
# Linux
sudo apt-get install openscad

# macOS
brew install openscad

# Windows
# Téléchargez depuis openscad.org
# Ajoutez au PATH système
```

## 📊 Historique des générations

Tous les badges générés sont sauvegardés dans `backend/generations/` :

```
generations/
├── 20231226_153045_params.json     # Paramètres utilisés
├── 20231226_153045_input.svg       # SVG original
├── 20231226_153045_badge.scad      # Fichier OpenSCAD généré
└── 20231226_153045_output.3mf      # Badge final
```

**Utilité :**
- Retrouver les paramètres d'un badge précédent
- Régénérer un badge identique
- Auditer les générations

**Nettoyage :**
```bash
# Supprimer les générations de plus de 30 jours
find backend/generations/ -name "*.3mf" -mtime +30 -delete
```

## 🎓 Tutoriel : Créer un logo SVG simple

Si vous n'avez pas de logo SVG, voici comment en créer un rapidement :

### Avec Inkscape (gratuit)

1. Téléchargez [Inkscape](https://inkscape.org/)
2. Créez un nouveau document
3. Utilisez les outils de dessin :
   - Cercle
   - Rectangle
   - Texte (converti en chemin)
4. Fichier → Enregistrer sous → SVG simple

### Avec un éditeur en ligne

1. [SVG-Edit](https://svg-edit.github.io/svgedit/)
2. [Vectr](https://vectr.com/)
3. [Boxy SVG](https://boxy-svg.com/)

### Avec du code

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#667eea"/>
  <text x="50" y="60" font-size="32" fill="white" 
        text-anchor="middle" font-family="Arial">B</text>
</svg>
```

Sauvegardez ce code dans un fichier `.svg` et utilisez-le !

## 🚀 Aller plus loin

### Personnalisation avancée

Vous pouvez modifier le template OpenSCAD pour :
- Changer les dimensions du badge
- Ajouter des trous de fixation
- Modifier les coins arrondis
- Changer la profondeur du logo

**Fichier à éditer :** `backend/badge_template.scad`

### API pour automatisation

Utilisez l'API directement pour automatiser :

```python
import requests

# Générer 10 badges avec différents logos
for i in range(10):
    files = {'svg_file': open(f'logo_{i}.svg', 'rb')}
    data = {'e_badge': '0.76'}
    
    response = requests.post(
        'http://localhost:5000/api/generate',
        files=files,
        data=data
    )
    
    with open(f'badge_{i}.3mf', 'wb') as f:
        f.write(response.content)
```

### Déploiement en production

Pour partager l'application avec d'autres :

1. **Backend** : Déployez sur un serveur cloud (AWS, Heroku, DigitalOcean)
2. **Frontend** : Déployez sur Netlify ou Vercel (gratuit)
3. **Base de données** : Ajoutez PostgreSQL pour l'historique persistant

Voir [README.md](README.md) pour les instructions complètes.

## 🤝 Besoin d'aide ?

- 📖 Consultez la [documentation complète](README.md)
- 🐛 Signalez un bug sur [GitHub Issues](https://github.com/AmelieThai/badge_generator/issues)
- 💬 Posez une question sur [GitHub Discussions](https://github.com/AmelieThai/badge_generator/discussions)

---

**Bon badge ! 🎨🖨️**
