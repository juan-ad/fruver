const express = require('express');
const { getProductos, postProductos, putProductos, deleteProductos } = require('../controllers/products');
const verifyToken = require('../token/token');

const routes = express.Router();

routes.get("/", verifyToken, getProductos);

routes.post("/", postProductos);

routes.put("/:idProducto", putProductos);

routes.delete("/:idProducto", deleteProductos);

module.exports = routes;
