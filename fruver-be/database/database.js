const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('fruver', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;