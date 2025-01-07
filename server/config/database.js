const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventory_smekda', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
