# Solo Trip — Frontend (`client`)

React + Vite + Tailwind CSS frontend for the Solo Trip travel companion platform.

## Run locally

```bash
cd client
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview the production build

## Architecture

- `src/pages` — route screens (thin composition)
- `src/components/<feature>` — reusable UI by feature area
- `src/components/common` — shared primitives (Button, Input, …)
- `src/data` — mock data until the API exists
- `src/layouts` — shared chrome (nav + `<Outlet />`)
- `src/utils` — pure helpers (dates, overlap)
