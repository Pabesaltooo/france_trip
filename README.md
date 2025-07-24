# Map Trip Planner Project Structure

- `public/` – Static files (e.g., `index.html`, icons, manifest)
- `src/` – Main JavaScript/TypeScript source code
- `data/` – Trip data (routes, locations, etc.)
- `main.html` – (Legacy) Standalone HTML for quick demo/testing

## How to use

- Edit `data/tripData.js` to add or change your trip stops and routes.
- Main logic should go in `src/main.js` (import trip data from `data/`).
- For a scalable app, move all map and UI logic to `src/` and use `public/index.html` as your entry point.

---

You can now easily scale this project by adding more files to `src/` (for components, utilities, etc.) and keeping your data in `data/`.
