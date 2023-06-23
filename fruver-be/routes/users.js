const express = require('express');
const verifyToken = require('../token/token');
const { login, getAll, update, add } = require('../controllers/users');
const routes = express.Router();

routes.post('/login', login);

routes.post('/signup', verifyToken, add);

routes.get('/', verifyToken, getAll);

routes.put('/', verifyToken, update);

module.exports = routes;