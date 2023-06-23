const express = require('express')
const cors = require('cors');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);

module.exports = app;