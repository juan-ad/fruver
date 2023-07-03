import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Order } from '../models/order.js';

export const Customer = sequelize.define('customer', {
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
  identificationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    tableName: 'customer',
    timestamps: false
});

Customer.hasMany(Order, {
  foreignKey: 'customerId',
  sourceKey: 'id'
})

Order.belongsTo(Customer, {
  foreignKey: 'customerId',
  targetKey: 'id'
})