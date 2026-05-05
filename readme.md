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
Studio (5003). The boot sequence is gated:

1. **db** starts; healthcheck waits for `pg_isready`.
2. **migrate** (one-shot) runs `prisma migrate deploy` and exits.
3. **be** / **studio** start only after migrate exits **successfully**.
4. **fe** starts after **be**.

If `migrate` fails, `be`/`fe`/`studio` never start — the stack stays in a known
state instead of running against a schema that doesn't match the Prisma
client. On a fresh `squaredb_vol`, the Postgres image also bootstraps the
`squaretrack` user/database from `DB_SQUARETRACK_*` automatically. No manual
psql steps required.

### Optional: pgAdmin

A pgAdmin sidecar is available behind the `admin` profile:

```bash
docker compose --profile admin up
```

Reachable at `http://localhost:5005` (or whatever `PGADMIN_PORT` is set to in
`.env`) with the credentials from `PGADMIN_EMAIL` / `PGADMIN_PW`. Saved server
connections persist in the `pgadmin_vol` volume across restarts.

## API conventions

When adding endpoints, follow the response shapes in
[`docs/api/README.md`](docs/api/README.md). Lists return `data: <array>`
(empty = `[]`); single-resource endpoints return `data: <object>` with 200 or
`data: null` with 404.
