import express from 'express';
import { verifyToken } from '../token/token.js';
import { login, getAll, add } from '../controllers/users.js';

export const userRoutes = express.Router();

userRoutes.post('/login', login);

userRoutes.post('/signup', add);

userRoutes.get('/', verifyToken, getAll);
