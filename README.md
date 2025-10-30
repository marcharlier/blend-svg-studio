## SVG Blend Studio

### 1) What this app does
SVG Blend Studio lets you upload a bitmap image (JPG, PNG, WEBP) and generate a single SVG that remains re‑colorable while preserving texture.

It stacks two color layers using CSS blend modes:
- **color**: applies hue/saturation of your chosen fill while preserving brightness
- **overlay**: remaps brightness so blacks stay black, whites stay white, and mid‑gray shows pure fill

The result is a compact SVG you can re‑tint by changing fill values, ideal for textured artwork like embroidery patterns.

- **Live tool**: [GitHub Pages](https://engineering.unmade.com/blend-svg-studio/) 

---

### 2) How it’s built and how to run it locally
- **Stack**: Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix primitives)
- **CSS features**: `mix-blend-mode: color` and `mix-blend-mode: overlay`

Run locally:
```sh
# Requirements: Node 18+ and npm
npm install
npm run dev
# Dev server at http://localhost:5173 (default Vite port)
```

Build a production bundle:
```sh
npm run build
# Outputs to dist/
```

Preview the production build locally:
```sh
npm run preview
```

---

### 3) How and where it’s deployed
- **Platform**: GitHub Pages
- **Automation**: GitHub Actions workflow at `.github/workflows/deploy.yml`
- **Trigger**: On push to `main` (and manual dispatch)
- **Process**:
  - Install dependencies with `npm ci`
  - Build with `npm run build` (Vite automatically sets the correct base using `GITHUB_REPOSITORY`)
  - Upload `dist/` as the Pages artifact
  - Deploy via `actions/deploy-pages`