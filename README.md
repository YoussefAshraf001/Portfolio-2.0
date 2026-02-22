# Youssef Ashraf - Portfolio 3.0

A fast, animated, design-forward portfolio built with React + Vite.

## Highlights

- Custom multi-theme UI system
- Interactive project cards with version switching (`v2.0` / `Original`)
- Skeleton + fade image loading
- Profile image lightbox preview
- CV preview modal + direct download
- Smooth Framer Motion transitions across key sections
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Framer Motion
- React Icons
- React Toastify

## Run Locally

```bash
npm install
npm run dev
```

Build production output:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.jsx
  index.css
  data/
    projects.js
    education.js
    experiences.js
  skill-image.js
public/
  Projects/
  skills/
  logos/
  profile.png
  Youssef-Ashraf-CV.pdf.pdf
```

## Content Editing

### Projects

Edit: `src/data/projects.js`

- Main categories:
  - `featured`
  - `frontend`
  - `demos`
- Optional versioned project format:

```js
versions: [
  {
    id: "latest",
    label: "v2.0",
    latest: true,
    image: "/Projects/weatherwatch.png",
    code: "https://github.com/...",
    demo: "https://...",
  },
  {
    id: "classic",
    label: "Original",
    image: "/Projects/weatherapp.jpg",
    code: "https://github.com/...",
    demo: "https://...",
  },
];
```

### Skills Icons

Edit mapping in `src/skill-image.js`.

Icons are loaded from:

- `public/skills`

### Logos

Education and experience logos are loaded from:

- `public/logos`

### CV

Current CV path is set in `src/App.jsx` via:

```js
const CV_FILE = "/Youssef-Ashraf-CV.pdf.pdf";
```

Rename your file if needed and update this constant.

## Deploy (Netlify)

This repo includes `netlify.toml` for Vite:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20.19.0`

Important:

- Remove `@netlify/plugin-nextjs` from Netlify Build Plugins for this project.
- This is a Vite app, not Next.js.

## Contact

- GitHub: `https://github.com/YoussefAshraf001`
- LinkedIn: `https://www.linkedin.com/in/youssef-ashraf-853a271b4/`
- Email: `youssefashraf273@gmail.com`
