import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { ProductOrder } from './product_order.js';

export const Order = sequelize.define('order', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  shoppingAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
},{
  tableName: 'order',
  timestamps: false
});

Order.hasMany(ProductOrder, {
  foreignKey: 'orderId',
  sourceKey: 'id'
});

ProductOrder.belongsTo(Order, {
  foreignKey: 'orderId',
  targetKey: 'id'
});


