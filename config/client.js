const { Client } = require("pg");

const db = new Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DATABASE,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
});

db.connect();

module.exports = db;
