const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const HOST = process.env.DB_HOST;
const PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.DB_PORT;

const config = {
  host: HOST,
  dialect: 'postgres',
  port: PORT,
  logging: false
};


const sequelize = new Sequelize('convolang-dev', 'postgres', PASSWORD, config);
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