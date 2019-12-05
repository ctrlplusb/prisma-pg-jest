# Prisma2 + Postgres + Jest

This example showcases how you can configure Jest to be able to perform integration testing against your Prisma 2 + Postgres configuration.

Each test suite will execute against their own temporary schema within the database, which reduces the chance for tests to affect each other, and allows concurrent execution of them. The temporary schema is subsequently cleaned up after each test suite has completed.

## Setup

Clone the repo.

```bash
git clone https://github.com/ctrlplusb/prisma2-pg-jest
```

Install the dependencies.

```bash
cd prisma2-pg-jest
npm install
```

## Running the database

A `docker-compose.yml` file has been created to represent the Postgres database that we will use for local development.

You will need [Docker](https://docs.docker.com/v17.09/engine/installation/) installed.

To start the database run the following command:

```bash
npm run db:start
```

Once you are finished developing you can stop the db by running the following command:

```bash
npm run db:stop
```

This project has been configured to run with the following Postgres configuration. You can modify these to suit your needs by editing the [`docker-compose.yml`](docker-compose.yml) file.

```
- HOST=localhost
- PORT=54320
- POSTGRES_USER=prisma
- POSTGRES_PASSWORD=hilly-sand-pit
- POSTGRES_DB=prisma
```

## Running your tests

You will need your local Postgres running.

To execute the Jest tests run the following command:

```bash
npm run test
```

Your tests will execute, with each of them getting a unique schema created for them against the running Postgres database. The migrations will be executed against them (i.e. `prisma2 lift up`) ensuring that the latest model has been applied.

> **Note:** These tests will only be able to use migrations that have been saved. The prisma dev migrations will be ignored.

In order to make all the above work we have configured Jest to execute with a custom test environment. See the [`prisma/prisma-test-environment.js](prisma/prisma-test-environment.js) file for more details.
