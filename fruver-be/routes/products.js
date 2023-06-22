const express = require('express');
const { getAll, add, update, getById, del } = require('../controllers/products');
const verifyToken = require('../token/token');
const routes = express.Router();

routes.get("/", getAll);

routes.post("/", verifyToken, add);

routes.get("/getById/:id", getById);

routes.put("/", verifyToken, update);

routes.delete("/:id", verifyToken, del);

module.exports = routes;
