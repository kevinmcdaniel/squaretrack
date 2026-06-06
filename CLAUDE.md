# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SquareTrack is a Square Dance tracking application with a monorepo structure containing:
- `be/` — Express.js backend API with Prisma ORM
- `fe/` — Next.js 15 frontend with App Router

## Development Commands

### Docker (recommended for full-stack dev)
```bash
docker compose up          # Start all services: BE (5002), FE (5001), DB (5004), Prisma Studio (5003)
```

### Backend (`be/`)
```bash
npm run dev      # Generate Prisma client + start nodemon (hot reload)
npm run migrate  # Run Prisma migrations (prisma migrate dev)
```

### Frontend (`fe/`)
```bash
npm run dev        # Start Next.js with Turbopack on $PORT
npm run build      # Production build
npm run lint       # ESLint (flat config, max-warnings 0)
npm run typecheck  # tsc --noEmit
```

Both packages also expose `npm run typecheck` and `npm run lint` in `be/` — CI runs both on every PR.

### Database
The README has instructions for initializing PostgreSQL with user `squaretrack` and database `squaretrack`. Connection config lives in `.env` at the repo root.

## Architecture

### Backend structure
- `be/src/server.ts` — Express app entry point (port 3000 internally, 5002 externally)
- `be/src/database.ts` — Prisma client singleton using `@prisma/adapter-pg`
- `be/src/route/` — Express routers; `index.ts` mounts sub-routers at `/api/call`, `/api/formation`, `/api/group`, `/api/sequence`
- `be/src/controller/` — Request handlers (thin layer, delegates to services)
- `be/src/service/` — Business logic
- `be/src/common/` — `authorize.ts` (API key/user auth middleware), `errorHandler.ts` (custom error classes + handler), `utils.ts`
- `be/src/prisma/` — Schema split into `calls.prisma` and `people.prisma`, plus `seed.ts` and `migrations/`

### Frontend structure
- `fe/src/app/` — Next.js App Router; main feature area is `calling/` with nested `calls/` and `sequences/` routes
- `fe/src/ui/` — Shared UI components (nav, sidebar, logo)
- `fe/src/lib/hac/fetch.ts` — API client for backend calls

### Data domains
- **Calls domain**: `call`, `call_family`, `call_formation`, `formation`, `program`, `sequence`, `sequence_calls`
- **People domain**: `dancer`, `dance_group`, `dance_program`, `group`, `group_assocations`, `country`, `state`

### Prisma setup
The backend uses `@prisma/adapter-pg` (not the default Prisma driver). Schema is split across multiple `.prisma` files referenced from `schema.prisma`. After any schema change, run `npm run migrate` in `be/`.

## API conventions

When adding or changing API endpoints, follow the response conventions in [`docs/api/README.md`](docs/api/README.md). Summary:

- **List endpoints** always return `data: <array>` — empty collection is `[]`, never `null`. HTTP 200 in both cases.
- **Single-resource endpoints** (`/:id`) return `data: <object>` with HTTP 200 when found, `data: null` with HTTP **404** when not found. Use `notFoundError`, never the (now-removed) `emptyError`.

Tests assert these shapes; FE consumers depend on them. If you find an endpoint that doesn't follow the convention, fix it as part of your change rather than copying the deviation.

## Typecheck & lint configs

Both packages run `tsc --noEmit` and ESLint flat-config in CI (`.github/workflows/ci.yml`). Keep them green.

**TypeScript strict flags enabled in both `be/tsconfig.json` and `fe/tsconfig.json`:**
- `strict`
- `noUnusedLocals`, `noUnusedParameters` — prefix intentionally-unused args with `_` (e.g. Express middleware `_req`, `_res`)
- `noFallthroughCasesInSwitch`
- `noImplicitOverride`

**Intentionally off:**
- `noUncheckedIndexedAccess` — high signal but too noisy on the existing controllers/scripts; revisit per-file via narrowing helpers.
- `exactOptionalPropertyTypes` — usually too noisy on Prisma/Next code without a dedicated pass.

**ESLint:** `--max-warnings 0` in both packages. `@typescript-eslint/consistent-type-imports` enforced. FE also runs `react-hooks/exhaustive-deps` as error.

**BE module setup:** `"type": "module"` + `"module": "NodeNext"`. Relative imports require `.js` extensions. Scripts use `import.meta` and run via `tsx`.
