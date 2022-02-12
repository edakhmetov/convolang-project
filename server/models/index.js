const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;

const config = {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT,
  logging: false
};


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, config);
const db = {};

const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (file !== 'index.js') {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;