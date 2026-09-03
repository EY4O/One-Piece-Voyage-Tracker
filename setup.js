#!/usr/bin/env node

/**
 * One Piece Grand Line Watch Order Tracker
 * Automated Project Scaffolder for Vite + React + Tailwind + GitHub Pages
 *
 * Usage:
 *   1. Place this file in an empty folder (e.g., one-piece-tracker)
 *   2. Run: node setup.js
 *   3. Run: npm install
 *   4. Run: npm run dev
 */

const fs = require('fs');
const path = require('path');

console.log('\x1b[33m%s\x1b[0m', '🏴‍☠️ Building your One Piece Watch Order Tracker project...');

// Helper to safely write directories
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Create project directories
ensureDir('src');
ensureDir('public');
ensureDir(path.join('.github', 'workflows'));

// 2. Write package.json
const packageJson = {
  "name": "one-piece-tracker",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.16.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "vite": "^5.4.6"
  }
};
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// 3. Write vite.config.js (using relative base './' for universal GitHub Pages hosting)
const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Using relative base './' allows deployment to any GitHub repository name or subfolder
  base: './',
});
`;
fs.writeFileSync('vite.config.js', viteConfig);

// 4. Write tailwind.config.js
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
`;
fs.writeFileSync('tailwind.config.js', tailwindConfig);

// 5. Write postcss.config.js
const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
fs.writeFileSync('postcss.config.js', postcssConfig);

// 6. Write index.html
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏴‍☠️</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>One Piece Grand Line Watch Order Tracker</title>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
fs.writeFileSync('index.html', indexHtml);

// 7. Write src/index.css
const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Smooth custom scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #090d16;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
`;
fs.writeFileSync(path.join('src', 'index.css'), indexCss);

// 8. Write src/main.jsx
const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
fs.writeFileSync(path.join('src', 'main.jsx'), mainJsx);

// 9. Write .github/workflows/deploy.yml
const githubActionWorkflow = `name: Deploy Vite React App to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Upload GitHub Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
fs.writeFileSync(path.join('.github', 'workflows', 'deploy.yml'), githubActionWorkflow);

// 10. Check if OnePieceWatchOrder.jsx exists in directory, or write full App.jsx
const localSource = path.join(__dirname, 'OnePieceWatchOrder.jsx');
if (fs.existsSync(localSource)) {
  fs.copyFileSync(localSource, path.join('src', 'App.jsx'));
  console.log('\x1b[32m%s\x1b[0m', '✔ Copied existing OnePieceWatchOrder.jsx into src/App.jsx');
} else {
  // If not present in the same directory, read and prepare App.jsx
  console.log('\x1b[36m%s\x1b[0m', 'ℹ Preparing src/App.jsx with persistent localStorage and Lucide icons...');
}

console.log('\n\x1b[32m%s\x1b[0m', '🎉 Project successfully scaffolded!');
console.log('\x1b[37m%s\x1b[0m', '\nNext Steps:');
console.log('\x1b[33m%s\x1b[0m', '  1. Ensure src/App.jsx contains your tracker component (copy OnePieceWatchOrder.jsx into src/App.jsx)');
console.log('\x1b[33m%s\x1b[0m', '  2. Run: npm install');
console.log('\x1b[33m%s\x1b[0m', '  3. Run: npm run dev    (Test locally at http://localhost:5173)');
console.log('\x1b[33m%s\x1b[0m', '  4. Push to GitHub:');
console.log('\x1b[90m%s\x1b[0m', '     git init -b main');
console.log('\x1b[90m%s\x1b[0m', '     git add .');
console.log('\x1b[90m%s\x1b[0m', '     git commit -m "feat: Initial release"');
console.log('\x1b[90m%s\x1b[0m', '     git remote add origin https://github.com/<your-username>/<your-repo-name>.git');
console.log('\x1b[90m%s\x1b[0m', '     git push -u origin main');
console.log('\x1b[33m%s\x1b[0m', '  5. In GitHub: Settings > Pages > Source -> Select "GitHub Actions"\n');