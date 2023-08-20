
const { Sequelize } = require('sequelize');
const fs = require("fs");

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DIALECT,
  DATABASE_PORT,
} = process.env;

/** connect to db */
const connectionString = `postgres://${DATABASE_USERNAME}${DATABASE_PASSWORD ? `:${DATABASE_PASSWORD}` : ""}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
const sequelize = new Sequelize(connectionString, {
  dialect: DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/** define models */
const items = fs.readdirSync(`${__dirname}/models`, { withFileTypes: true });
items.forEach((item) => {
  /** initialize model file */
  item.isFile() &&
    item.name.includes("model.js") &&
    require(`${__dirname}/models/${item.name}`)(sequelize);
});

// sequelize.sync({force: true});
module.exports = sequelize;