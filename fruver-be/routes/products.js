import express from 'express';
import { getAll, add, update, getById, del } from '../controllers/products.js';
import { verifyToken } from '../token/token.js';

export const productRoutes = express.Router();

productRoutes.get("/", getAll);

productRoutes.post("/", verifyToken, add);

productRoutes.get("/getById/:id", getById);

productRoutes.put("/", verifyToken, update);

productRoutes.delete("/:id", verifyToken, del);