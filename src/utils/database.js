const { Client } = require("pg");
// Client é uma propriedade do objeto pg, quando chama o pg retorna o objeto todo, mas eu só quero o client

require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PW,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  // connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

module.exports = client;
