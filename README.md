# Product Manager — Front-end React

Interface utilisateur pour la gestion de produits, connectée au back-end Node.js.

## Technologies

- **React** + **Vite** — UI et build
- **React Router** — navigation
- **Axios** — appels API
- **Tailwind CSS** — styles

## Fonctionnalités

- Liste des produits avec recherche
- Création de produit avec upload d'image
- Modification de produit
- Suppression avec confirmation
- Preview d'image avant upload

## Prérequis

Le back-end [product-manager-backend](https://github.com/stephane-1234/product-manager-backend) doit tourner sur `http://localhost:3005`

## Installation

```bash
git clone https://github.com/stephane-1234/product-manager-frontend.git
cd product-manager-frontend
npm install
```

Crée un fichier `.env` :

```env
VITE_API_URL=http://localhost:3005/api
```

Lance le projet :

```bash
npm run dev
```

Ouvre `http://localhost:5173`