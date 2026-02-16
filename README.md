# APRT Website (Next.js)

Site APRT inspire de la structure UX de `somipev.ma` (menu dropdown desktop + accordéon mobile, pages denses, sidebar de sections, footer riche), sans reprise de code/assets externes.

## Progression actuelle
- Home enrichie:
  - Hero evenement principal 2026
  - Compte a rebours (jours/heures/minutes/secondes) vers le 08/05/2026
  - Description ajoutee sous le titre principal de l'evenement
  - Liens rapides (Programme, Intervenants, E-posters, Attestation, Replay, Live)
  - Bloc "A la une / Dernieres actualites"
  - Bloc "Presentation de l'APRT"
  - Bloc "Mot du President" optimise pour garder une hauteur visuelle alignee avec "A la une"
  - Archives d'evenements
- Navbar restructuree:
  - Accueil, Programme, Intervenants, E-posters, Galerie, A propos de nous, Evenements (dropdown), Contact
  - Desktop: dropdown au survol + chevron
  - Mobile: accordéon au clic
- Footer refait en 4 colonnes:
  - A propos, Liens rapides, Evenements, Contact
  - Icônes sociaux (Facebook, Instagram, LinkedIn, YouTube)
- Pages:
  - `/`, `/events`, `/events/[slug]`
  - `/events/[slug]/programme`
  - `/events/[slug]/intervenants`
  - `/events/[slug]/eposters`
  - `/events/[slug]/mot-du-president`
  - `/galerie`, `/a-propos`, `/contact`
  - routes utilitaires: `/programme`, `/intervenants`, `/eposters` (redirigent vers 2026)
- Donnees:
  - JSON local dans `content/events/`
  - `aprt-2025.json` complet (programme detaille + mot du president + e-posters + intervenants + infos pratiques)
  - `aprt-2026.json` structure complete prete ("a venir" pour sections detaillees)
  - actualites: `content/news/index.json`
  - galerie: `content/galerie/index.json`
- SEO:
  - metadata globale + OpenGraph
  - favicon via `app/icon.png` (logo APRT)
  - metadata par page principale
- Images:
  - Poster 2026: `public/assets/events/2026-poster.jpg`
  - Poster 2025: `public/assets/events/2025-poster.jpg`
  - Galerie Essaouira: `public/assets/galery/essaouira*.jpeg`

## Dernieres modifications enregistrees
- Countdown deplace sous le bloc hero principal (entre hero et section presentation).
- Home mobile: carrousels pour les evenements et la galerie (au lieu d'une liste verticale longue).
- Page `/galerie`: titre de section "Essaouira" conserve, titres de chaque photo retires.
- Affiche 2025 remplacee globalement par `fiche 31e.jpeg` (via `public/assets/events/2025-poster.jpg`).
- Footer rapproche du style SOMIPEV:
  - titres FR/AR plus grands et sur 2 lignes,
  - logo au centre entre les deux titres,
  - contacts avec icones et reseaux sociaux.

## Stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Contenu JSON local

## Lancer en local
```bash
npm install
npm run build
npx next start -p 3000
```
Puis ouvrir `http://localhost:3000`.

## Ajouter un nouvel evenement
1. Ajouter entree dans `content/events/index.json`:
   - `slug`, `editionTitle`, `datesText`, `city`, `posterImagePath`, `status`, `startDateISO`
2. Creer `content/events/[slug].json`:
   - `themes`, `contacts`, `email`, `submissionDeadline`
   - `sections.programme.days[]`
   - `sections.speakers[]`
   - `sections.eposters[]`
   - optionnels: `sections.presidentMessage`, `sections.practicalInfo`, `sections.documents`, `sections.usefulLinks`
3. Ajouter poster dans `public/assets/events/`.

## Ajouter des e-posters
- Ajouter une entree dans `sections.eposters` du JSON evenement:
```json
{
  "title": "Titre e-poster",
  "language": "Francais",
  "tags": ["Categorie"]
}
```
La recherche, les tags et la pagination sont automatiques.

## Ajouter des images galerie
- Ajouter image dans `public/assets/galerie/`
- Ajouter entree dans `content/galerie/index.json`:
```json
{
  "id": "gal-x",
  "title": "Titre",
  "imagePath": "/assets/galerie/fichier.jpg"
}
```
