const express = require('express')
var cors = require('cors');
const connection = require('./connection');
const adminRoute = require('./routes/admin');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/admin', adminRoute);

module.exports = app;