import express from 'express';
import { verifyToken } from '../token/token.js';
import { login, getAll, update, add } from '../controllers/users.js';

export const userRoutes = express.Router();

userRoutes.post('/login', login);

userRoutes.post('/signup', verifyToken, add);

userRoutes.get('/', verifyToken, getAll);

userRoutes.put('/', verifyToken, update);
