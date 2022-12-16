# Cloudflare Workers D1 Template

This is a template for a [Cloudflare Workers](https://workers.cloudflare.com/) project that uses [D1](https://blog.cloudflare.com/introducing-d1/) and [Hono](https://honojs.dev/). It includes multiple options for running the project locally, on Cloudflare's edge network, and testing. There is also an alternative version of the project that uses [Node.js](https://nodejs.org/) with [Prisma](https://www.prisma.io/) and [Express](https://expressjs.com/) in the same codebase.

![Insomnia](https://user-images.githubusercontent.com/3791148/208193854-befed6b2-cc8b-4683-801c-e7dc00bac9ee.png)

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Cloudflare%20Workers%20D1%20Template&uri=https%3A%2F%2Fgist.githubusercontent.com%2Fmkuchak%2Fdddcf33b56d9cbe3bcb2bf0f9bf3b12b%2Fraw%2Ff5fc1ffaab60359a9646cdf2768a54c7d7868aee%2Fcloudflare-workers-d1-template-insomnia.json)

### Getting started

1. Install dependencies

```bash
npm install
```

2. Create a D1 database locally

```bash
npx wrangler d1 execute d1-template --local --file ./src/infra/repository/d1/migrations/0000_init.sql
```

3. Start the development server

```bash
npm run dev
```

This will start a server at http://localhost:3000, with the Cloudflare Workers entrypoint at `./src/workers.ts`.

### Deploying to Cloudflare's edge network

1. Sign in to Cloudflare

```bash
npx wrangler login
```

2. Create a D1 database on Cloudflare's edge network and fill in the `database_name`, `database_id`, and `preview_database_id` fields in .`wrangler.toml`:

```bash
npx wrangler d1 create d1-template
```

3. (Optional) Create a migration

```bash
npx wrangler d1 migrations create d1-template "second migration"
```

There is already a migration in `./src/infra/repository/d1/migrations`, so you can skip this step.

4. Run the following command to apply the database migrations:

```bash
npx wrangler d1 migrations apply d1-template
```

5. Starting the staging server

```bash
npm run dev:staging
```

This will start a server at Cloudflare in http://localhost:3000 through a tunnel.

6. Deploying to production

```bash
npx wrangler publish --minify
```

### Testing

With the dev or staging server running, you can run end-to-end, integration, and unit tests with the following command:

```bash
npm run test
```

## Experiment with the GraphQL version

To try out the GraphQL version of the project, run the development server with the following command:

```bash
npm run dev:graphql
```

Open http://localhost:3000/graphql in your browser. The entrypoint for this version is `./src/workers-graphql.ts`.

## Alternative version using Node.js

To try the alternative version using Node.js, follow these steps:

1. Create an environment file based on the example:

```bash
cp .env.example .env
```

2. Execute the Prisma SQLite migration (this will also generate the Prisma Client):

```bash
npx prisma migrate dev --name init
```

3. Start the Node.js development server

```bash
npm run dev:node
```

This will start a server at http://localhost:3000, with the Node.js entrypoint at `./src/node.ts`.

4. Alternatively, start the production server:

```bash
npm run start
```

5. To try the GraphQL version, run the following command:

```bash
npm run dev:node:graphql
```

Open http://localhost:3000/graphql in your browser. The entrypoint for this version is `./src/node-graphql.ts`.
