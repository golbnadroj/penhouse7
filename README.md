# Pen'House Conciergerie — Static Website

This project is an Eleventy-powered static website for **PEN'HOUSE Conciergerie** (Sarthe & Perche, France).

## Prerequisites

* Node.js ≥ 18 (see your version with `node -v`)
* npm ≥ 9 (comes with Node)

## Installation

```bash
# Install dependencies
npm install
```

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Run Eleventy in **development** mode with live-reload (`http://localhost:8080`). |
| `npm run build` | Generate the static site in the `_site/` directory. |

> **Tip:** When deploying, always run `npm run build` first. The `_site/` directory is created automatically and is **ignored** in Git (see `.gitignore`).

## Project Structure

```
├── src/               # Source templates, includes, assets
│   ├── _includes/     # Shared header / footer / layout
│   ├── *.html         # Page templates (Liquid)
│   ├── style.css      # Custom CSS (processed by Tailwind CDN for now)
│   ├── script.js      # Small vanilla-JS helpers
│   └── ...
├── .eleventy.js       # Eleventy configuration
├── package.json       # npm metadata & scripts
└── README.md          # You are here
```

## Deployment

Because the output is 100 % static HTML/CSS/JS, you can host it on any static host (Netlify, Vercel, Cloudflare Pages, S3, GitHub Pages, …).

A minimal workflow using **GitHub Actions** might look like:

```yaml
name: Deploy website
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          publish_dir: _site
```

## License

© 2025 — PEN'HOUSE Conciergerie. All rights reserved. # PEN-HOUSE
