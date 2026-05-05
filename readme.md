### Welcome to SquareTrack
###
###  Your Square Dance Track Everything System.

Key technologies used:
- Next.js
- Node.js — https://nodejs.org/en/download
- PostgreSQL
- Prisma
- TailwindCSS
- Shadcn UI
- Docker

## Environment

Copy [`.env.example`](.env.example) to `.env` at the repo root and fill in the
secret values (anything marked `change-me`). Every service in
`docker-compose.yml` mounts that file via `env_file:`, so a single `.env` is
sufficient for the whole stack.

```bash
cp .env.example .env
$EDITOR .env
```

## Quick start

```bash
docker compose up
```

That brings up Postgres (5004), the BE API (5002), the FE (5001), and Prisma
Studio (5003). On a fresh checkout the Postgres image bootstraps the
`squaretrack` user and database from `DB_SQUARETRACK_*` on first run, and the
`be`, `fe`, and `studio` services wait for `pg_isready` before starting — no
manual psql steps required.

### Optional: pgAdmin

A pgAdmin sidecar is available behind the `admin` profile:

```bash
docker compose --profile admin up
```

Reachable at `http://localhost:${PGADMIN_PORT}` with the credentials in `.env`.

## API conventions

When adding endpoints, follow the response shapes in
[`docs/api/README.md`](docs/api/README.md). Lists return `data: <array>`
(empty = `[]`); single-resource endpoints return `data: <object>` with 200 or
`data: null` with 404.
