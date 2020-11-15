const { Client } = require("pg");
const Config = require("./config");

const client = new Client({
  connectionString: Config.DB_URI,
});

client.connect();

module.exports = client;
