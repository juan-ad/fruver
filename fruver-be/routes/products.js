const express = require('express');
const { getAll, add, update, getById, del } = require('../controllers/products');
const verifyToken = require('../token/token');
const routes = express.Router();

routes.get("/", getAll);

routes.post("/", verifyToken, add);

routes.get("/getById/:idProducto", getById);

routes.put("/", verifyToken, update);

routes.delete("/:idProducto", verifyToken, del);

module.exports = routes;
