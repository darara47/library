## Description

Application to management library.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test:watch
```

## Database

```bash
# run seeds
$ npm run seed

# generate migration
$ npx typeorm-ts-node-esm migration:generate -d src/database/data-source.ts src/database/migrations/setup

# generate migration
$ npx typeorm-ts-node-esm migration:generate -d src/database/data-source.ts src/database/migrations/setup
```
