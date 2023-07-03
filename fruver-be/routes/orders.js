import express from 'express';
import { getAll, add, dispatchOrder } from '../controllers/orders.js';
import { verifyToken } from '../token/token.js';

export const ordersRoutes = express.Router();

ordersRoutes.get("/", verifyToken, getAll);

ordersRoutes.post("/", add);

ordersRoutes.put("/", verifyToken, dispatchOrder);