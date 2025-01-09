const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rpl = sequelize.define('Rpl', {
  nama_komputer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lokasi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Rpl;
