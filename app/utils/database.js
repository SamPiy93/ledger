const Sequelize = require('sequelize');
const { HOST, USER, PASSWORD, DB } = require('../config/db.config');

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        HOST,
        dialect: 'mysql'
    }
);

module.exports = sequelize;