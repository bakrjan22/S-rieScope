# 🎬 MovieHub — Catalogue de films et séries

MovieHub est une application web de consultation et de gestion d'un catalogue de films et de séries développée en JavaScript Vanilla ES6+. Elle permet aux utilisateurs de découvrir des séries, de consulter leurs informations, de rechercher des titres, de filtrer les contenus par genre et d'ajouter leurs propres films au catalogue.

Les données des séries sont récupérées dynamiquement grâce à l'API publique **TVmaze**.

Le projet a été réalisé dans le cadre de la formation Développeur Web et Web Mobile.

---

## 📋 Présentation du projet

MovieHub est une application web permettant de parcourir un catalogue de séries et de gérer l'ajout de nouveaux films.

L'application propose plusieurs fonctionnalités :
- **Catalogue** : permet d'afficher les séries récupérées depuis l'API TVmaze sous forme de cartes.
- **Recherche** : permet de rechercher des séries par leur nom.
- **Filtrage par genre** : permet de filtrer les contenus selon leurs catégories.
- **Ajout de films** : permet d'ajouter manuellement de nouveaux films au catalogue.

Les données des séries sont récupérées depuis une API externe avec `fetch()`. Les films ajoutés manuellement sont stockés temporairement dans un tableau JavaScript pendant l'exécution de l'application.

---

## 🎯 Objectifs du projet

- Développer une application web interactive avec JavaScript ES6+.
- Consommer une API REST avec `fetch()`.
- Manipuler les données JSON retournées par une API.
- Utiliser les Promises pour gérer les opérations asynchrones.
- Manipuler le DOM pour générer dynamiquement des cartes.
- Implémenter un système de recherche et de filtrage.
- Mettre en place un système d'affichage progressif des contenus.
- Organiser le code avec les modules JavaScript ES6 (`import` / `export`).
- Manipuler les tableaux et les objets JavaScript.
- Permettre l'ajout de nouveaux films par l'utilisateur.

---

## ✨ Fonctionnalités

### 🎥 Affichage des films et séries
- Récupération automatique des séries depuis l'API TVmaze.
- Affichage dynamique des contenus sous forme de cartes.
- Présentation du titre, de l'image, des genres et de la description.
- Suppression des balises HTML présentes dans les descriptions récupérées depuis l'API.
- Limitation de la longueur des descriptions pour conserver un affichage uniforme.
- Affichage initial de 5 contenus.

### 🔍 Recherche et filtrage
- Recherche instantanée par nom de film ou de série.
- Recherche insensible à la casse.
- Filtrage des contenus par genre.
- Possibilité de combiner la recherche par nom et le filtre par genre.
- Réinitialisation des critères de recherche et de filtrage en un clic.
- Génération dynamique des options de genres à partir des données récupérées depuis l'API.
- Éviter les doublons dans la liste des genres.

### ➕ Ajout de films
- Ajout manuel d'un nouveau film à travers un formulaire.
- Saisie du nom du film.
- Saisie de la description.
- Saisie des genres sous forme de valeurs séparées par des virgules.
- Vérification des champs obligatoires.
- Limitation de la description affichée à 50 caractères.
- Attribution d'une image par défaut aux films ajoutés.
- Insertion des nouveaux films au début du catalogue.
- Ajout automatique des nouveaux genres dans la liste des filtres.

### 📄 Affichage progressif (Load More)
- Affichage initial de 5 contenus.
- Ajout de 5 contenus supplémentaires à chaque clic sur le bouton « Show More ».
- Mise à jour du nombre de contenus affichés.
- Prise en compte des critères de recherche et de filtrage lors de l'affichage.

### 🌐 Consommation de l'API TVmaze
- Utilisation de l'API publique TVmaze.
- Récupération des séries avec `fetch()`.
- Gestion des opérations asynchrones avec les Promises.
- Récupération des données au format JSON.
- Extraction des informations utiles : identifiant, nom, description, genres et image.
- Gestion des erreurs lors de la récupération des données.

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
| :--- | :--- |
| **HTML5** | Structure et sémantique de la page |
| **CSS3** | Mise en forme et design de l'application |
| **JavaScript (ES6+)** | Logique et interactions dynamiques |
| **DOM** | Manipulation et génération des éléments HTML |
| **Fetch API** | Récupération des données depuis une API externe |
| **Promises** | Gestion des opérations asynchrones |
| **ES6 Modules** | Organisation du code avec `import` / `export` |
| **JSON** | Récupération et manipulation des données de l'API |
| **Expressions régulières (Regex)** | Suppression des balises HTML dans les descriptions |
| **Git & GitHub** | Gestion des versions et hébergement |

**Contraintes techniques :** JavaScript Vanilla uniquement, sans framework ni bibliothèque JavaScript externe.

---

## 🔗 API utilisée

**TVmaze API**

L'application utilise l'endpoint suivant pour récupérer les séries :

`https://api.tvmaze.com/shows?page=0`

Cette API fournit notamment :
- L'identifiant de chaque série.
- Le nom de la série.
- Le résumé.
- Les genres.
- Les images.

Documentation officielle : https://www.tvmaze.com/api

---

## 🚀 Installation et lancement

0. Jira : <img src="./asset/img/Screenshot 2026-11-13 144020.png">

1. Cloner le dépôt GitHub :https://github.com/bakrjan22/S-rieScope

```bash
git clone https://github.com/bakrjan22/S-rieScope