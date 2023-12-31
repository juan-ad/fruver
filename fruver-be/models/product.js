import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { ProductOrder } from './product_order.js';

export const Product = sequelize.define('product', {
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
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
},{
    tableName: 'product',
    timestamps: false
});

Product.hasMany(ProductOrder, {
  foreignKey: 'productId',
  sourceKey: 'id'
});

ProductOrder.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id'
});