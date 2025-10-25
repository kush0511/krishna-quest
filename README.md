# Krishna's Divine Quest

A mobile-first, Krishna-themed single-page web application for a romantic scavenger hunt. Built as a static site for easy local development and GitHub Pages deployment.

## Features

- Password-style riddle gate with delightful errors and animations
- Success state with quest introduction and CTA
- LocalStorage persistence for unlock progress
- Mobile-first responsive layout and accessible markup
- Background flute music with interaction-safe autoplay and floating control
- Subtle decorative sparkles (🦚 ✨ 🪷)

## Tech

- HTML5, CSS3, JavaScript (no build step required)
- Optional: You can later migrate to Svelte if you want component structure; for GitHub Pages a static build is simplest.

## Getting Started (Local)

1. Open `index.html` directly in your browser, or run a local server:

   - Python 3: `python3 -m http.server 8080`
   - Node (http-server): `npx http-server -p 8080 --silent`

2. Navigate to `http://localhost:8080` (if using a server).

## Customization

- Update colors and typography in `styles.css` (CSS variables at the top).
- Adjust riddle text and messages in `index.html` and `script.js`.
- Extend accepted answers by editing `ACCEPTED_ANSWERS` in `script.js`.
- Music: Replace `krishna_flute.mp3` with your own track. The mute preference is saved in LocalStorage.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to the root of the `main` branch.
2. In the repository settings, enable GitHub Pages with Source = `Deploy from a branch`, Branch = `main`, Folder = `/ (root)`.
3. Your site will be available at `https://<your-username>.github.io/<repo-name>/` after a minute.

Alternatively, you can serve from `/docs` by moving files into a `docs/` folder and selecting that as the Pages folder.

## Notes on Assets

You can add Krishna or peacock illustrations by placing images in this folder and referencing them in `index.html`. Make sure to respect the image license when sourcing assets.

Recommended sources (verify licenses before use):

- Public domain and CC images on Wikimedia Commons and via Openverse.
- Free Pixabay vectors/photos (no attribution for most assets).
- Official icon/illustration libraries that allow personal use.


