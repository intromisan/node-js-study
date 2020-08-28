const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-study', 'root', 'Pa8633004329', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;