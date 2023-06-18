const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config;

router.post('/signup', (req, resp) => {
    let admin = req.body;
    query = "SELECT email, password, status FROM admin WHERE email=?";
    connection.query(query, [admin.email], (err, results) => {
        if (!err){
            if (results.length <= 0){
                query = "INSERT INTO admin(name, contact_name, email, password, status) VALUES(?,?,?,?,'true')";
                connection.query(query, [admin.name, admin.contactName, admin.email, admin.password], (err, results) => {
                    if (!err){
                        return resp.status(200).json({message: "Regisrado exitosamente"});
                    }else{
                        return resp.status(500).json(err);
                    }
                });
            }else{
                return resp.status(400).json({message: "Un administrador con ese email ya existe"})
            }
        }else{
            return resp.status(500).json(err);
        }
    });
});

router.post('/login', (req, res) => {
    const admin = req.body;
    query = "SELECT email, password FROM admin WHERE email=?"
    connection.query(query, [admin.email], (err, results) => {
        if (!err){
            if (results.length <= 0 || results[0].password != admin.password ){
                return res.status(401).json({message: "Correo y/o contraseña incorrectos"});
            }else if(results[0].password == admin.password){
                const response = { email: results[0].email };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h'})
                return res.status(200).json({token: accessToken});
            }else{
                return res.status(400).json({message: "Algo salió mal. Por favor intente más tarde"});
            }
        }else{
            return res.status(500).json(err);
        }
    });
});

router.get('/get', (req, res) => {
    const query= "SELECT * FROM admin";
    connection.query(query, (err, results) => {
        if (!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    });
});

router.put('/update', (req, res) => {
    const query= "SELECT * FROM admin";
    connection.query(query, (err, results) => {
        if (!err){
            return res.status(200).json(results);
        }else{
            return res.status(500).json(err);
        }
    });
});

module.exports = router;