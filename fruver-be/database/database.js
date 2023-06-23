import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('fruver', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
