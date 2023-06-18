const express = require('express')
const cors = require('cors');
const adminRoutes = require('./routes/admins');
const productRoutes = require('./routes/products');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);

module.exports = app;