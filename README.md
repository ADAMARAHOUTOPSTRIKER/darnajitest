# DAR NAJI — Restaurant Marocain d'Exception

Site vitrine du restaurant Dar Naji. Ouvrir `index.html` via un petit serveur local
(`python3 -m http.server` dans ce dossier) — le héro charge 120 images, le protocole
`file://` peut les bloquer selon le navigateur.

## À personnaliser (1 minute)

Dans `js/main.js`, tout en haut :

```js
whatsappNumber: "212600000000",  // votre numéro WhatsApp, format international sans "+"
```

Tous les boutons WhatsApp du site (nav, réservation, fiche plat) utilisent ce numéro.

## Remplacer les illustrations par de vraies photos de plats

Dans `js/dishes.js`, chaque plat signature possède un champ `photo: null`.
Déposez vos photos dans `assets/plats/` puis renseignez par exemple :

```js
photo: "assets/plats/tanjia.jpg",
```

L'illustration or est alors remplacée partout (carrousel + fiche). Format conseillé :
photos verticales ou carrées, le cadre en arche s'occupe du reste.

## Modifier la carte

Toujours dans `js/dishes.js` : le tableau `MENU` contient toutes les catégories et
les prix (en Dh) tels que sur le menu physique. Ajouter / modifier un plat = une ligne.

## Structure

- `assets/frames/` — 120 images extraites de la vidéo (défilement piloté au scroll, sans son)
- `js/dishes.js` — plats signatures (palette de saveurs) + carte complète + illustrations SVG
- `js/main.js` — héro scroll-scrub, carrousel, fiches plat, liens WhatsApp
- `js/vendor/` — GSAP, ScrollTrigger, Lenis (embarqués : aucun CDN requis)
