/* eslint-disable @typescript-eslint/no-var-requires */

const { Client } = require("pg");
const NodeEnvironment = require("jest-environment-node");
const nanoid = require("nanoid");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const prismaBinary = "./node_modules/.bin/prisma2";

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    // Generate a unique schema identifier for this test context
    this.schema = `test_${nanoid()}`;

    // Generate the pg connection string for the test schema
    this.connectionString = `postgresql://prisma:hilly-sand-pit@localhost:54320/prisma?schema=${this.schema}`;
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    process.env.POSTGRES_URL = this.connectionString;
    this.global.process.env.POSTGRES_URL = this.connectionString;

    // Run the migrations to ensure our schema has the required structure
    await exec(`${prismaBinary} lift up`);

    return super.setup();
  }

  async teardown() {
    // Drop the schema after the tests have completed
    const client = new Client({
      connectionString: this.connectionString
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = PrismaTestEnvironment;
