# Mirador User Guide

A Next.js and Outstatic documentation app for the Mirador user guide.

## Local Development

Use Node 24 or newer:

```bash
nvm use
npm install
npm run dev
```

Open `http://localhost:3000` for the public guide and `http://localhost:3000/outstatic` for the Outstatic CMS.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Netlify

The repo includes `netlify.toml` with:

- build command: `npm run build`
- publish directory: `.next`
- Node major: `24`

Netlify automatically applies its current OpenNext adapter for supported Next.js projects.
