import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/users.js';
import { productRoutes } from './routes/products.js';
import { ordersRoutes } from './routes/orders.js';
export const app = express();

app.use(cors());
// Middleware para analizar las solicitudes con formato de formulario
app.use(express.urlencoded({extended: true, limit: '20mb'})); // Se aumenta el límite a 20mb
// Middleware para analizar las solicitudes con formato JSON
app.use(express.json({limit: '20mb'}));// Se aumenta el límite a 20mb
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);