# Prisma + Postgres + Jest

This example showcases how you can configure your Jest environment in order to perform integration tests against applications utilising Prisma and Postgres.

Each test suite will create a temporary schema within the database, allowing concurrent execution of them. The temporary schema is subsequently cleaned up after each test suite has completed.

## Setup

Clone the repo.

```bash
git clone https://github.com/ctrlplusb/prisma-pg-jest
```

Install the dependencies.

```bash
cd prisma-pg-jest
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

## Jest Configuration

We have configured Jest to execute with a custom test environment. See the [`prisma/prisma-test-environment.js](prisma/prisma-test-environment.js) file for more details.

This custom environment ensures that each test suite getting executed will have a unique schema created for them against the running Postgres database. The migrations will then be executed against them, via the `prisma migrate up --experimental` command, ensuring that the latest model has been applied to the schema.

## Running your tests

Ensure that your local Postgres is running.

```bash
npm run db:start
```

Then execute the Jest tests via the following command:

```bash
npm run test
```
