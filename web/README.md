# Callida — React clients marquee (`web/`)

The main marketing site in this repo is **static HTML** (`index.html` + `styles.css`). The **Our clients** strip is implemented there with a CSS marquee, Callida tokens, and soft edge fades (aligned with the shadcn-style `ProgressiveBlur` + `InfiniteSlider` pattern).

This folder is a **Vite + React + TypeScript + Tailwind** app that hosts the same interaction using the components from your integration prompt, so you can iterate in React or later embed a build if you move the site to a framework.

## Prerequisites

- Node 20+ recommended

## Install & run

```bash
cd web
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## shadcn-style layout

- **`components.json`** — mirrors shadcn defaults (`aliases.ui` → `@/components/ui`).
- **UI primitives** live under **`src/components/ui/`** (not `/components/ui` at repo root). That path is the shadcn CLI default *inside a project*; keeping `src/components/ui` matches Vite + TypeScript conventions and lets `npx shadcn@latest add …` drop files in the expected place when you run the CLI from `web/`.

## Dependencies (per prompt)

| Package            | Role                                      |
|--------------------|-------------------------------------------|
| `motion`           | `ProgressiveBlur` (`motion/react`)        |
| `framer-motion`    | `InfiniteSlider` (`animate`, `motion`)    |
| `react-use-measure`| Measure strip width for loop animation    |
| `clsx` + `tailwind-merge` | `cn()` in `src/lib/utils.ts`     |
| `lucide-react`     | Optional icon tile in `ClientsLogosSlider` |

## Initialise shadcn from scratch (optional)

If you prefer the full CLI registry flow from an empty folder:

```bash
cd web
npx shadcn@latest init
```

Choose Tailwind, TypeScript, `@/*` alias to `./src/*`, and default `src/components/ui`. Then `npx shadcn@latest add button` (etc.) will match documentation paths.

## Callida design alignment

- Tailwind theme in **`tailwind.config.ts`** maps **paper / paper-2 / ink / rule / yellow** to the same hex values as `styles.css`.
- **`ClientsLogosSlider`** uses Unsplash crops that return **HTTP 200** (verified), anonymised captions, and a conservative card frame (`border-rule`, `bg-paper`).

## Why not only React on the live homepage?

The published prototype ships as static files with no bundler. The HTML marquee keeps **zero JS dependencies** for visitors while this `web/` package holds the React reference implementation.
