# Cloudflare Workers D1 Template

This is a template for a [Cloudflare Workers](https://workers.cloudflare.com/) project that uses [D1](https://blog.cloudflare.com/introducing-d1/) and [Hono](https://honojs.dev/).

### Easy local starting

```bash
# install dependencies
npm install

# create d1 locally
npx wrangler d1 execute d1-template --local --file ./src/infra/repository/d1/migrations/0000_init.sql

# run dev server (started at http://localhost:3000)
# Cloudflare Workers entrypoint is `./src/workers.ts`
npm run dev
```

### Trying on the edge

```bash
# sign in to Cloudflare
npx wrangler login

# create D1 database and fill `database_name`, `database_id` and `preview_database_id` in `.wrangler.toml`
npx wrangler d1 create d1-template

# create a migration (already created in `./src/infra/repository/d1/migrations`)
# npx wrangler d1 migrations create d1-template "second migration"

# apply migrations
npx wrangler d1 migrations apply d1-template

# run staging server at Cloudflare (started at http://localhost:3000 through a tunnel)
npm run dev:staging

# deploy the worker
npx wrangler publish --minify
```

### Testing

With the dev or staging server running, you can run e2e, integration and unit tests with `npm run test` command.

## How about trying it in Node.js?

An alternative version using [Node.js](https://nodejs.org/) with [Prisma](https://www.prisma.io/) and [Express](https://expressjs.com/) in the same codebase.

```bash
# create an environment file based on the example
cp .env.example .env

# generate Prisma client
npx prisma generate

# start node dev server (started at http://localhost:3000)
# Node.js entrypoint is `./src/node.ts`
npm run dev:node

# or start the production server
npm run start
```