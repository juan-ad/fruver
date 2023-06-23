import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/users.js';
import { productRoutes } from './routes/products.js';
export const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
