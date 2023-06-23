const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Product = sequelize.define('products', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    timestamps: false
});

module.exports = Product;