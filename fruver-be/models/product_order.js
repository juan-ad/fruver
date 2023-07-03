import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const ProductOrder = sequelize.define('product_order', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},{
    tableName: 'product_order',
    timestamps: false
});