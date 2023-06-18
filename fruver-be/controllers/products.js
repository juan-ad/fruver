const connection = require('../connection');

const getAll = async (req, res)=>{
    const query = "SELECT * FROM product";
    await connection.query(query, (err, data) => {
        if (!err){
            res.status(200).json(data);
        }else{
            res.status(400).json({mensaje: err});
        }
    });
}

const add = async (req, res)=>{
    let product = req.body;
    const query = "INSERT INTO product (name, description, price, image, status) VALUES(?,?,?,?,'true')";
    await connection.query(query, [product.name, product.description, product.price, product.image], (err, data) => {
        if (!err){
            return res.status(200).json({mensaje: "Producto agregado satisfactoriamente"});
        }else{
            return res.status(400).json({mensaje: err});
        }
    });
}

const getById = async (req, res)=>{
    const id = req.param.id;
    const query = "SELECT * FROM product WHERE id = ?";
    await connection.query(query, [id], (err, data) => {
        if (!err){
            res.status(200).json(data[0]);
        }else{
            res.status(400).json({mensaje: err});
        }
    });
}

const update = async(req, res)=>{
    let product = req.body;
    const query = "UPDATE product set name = ?, description = ?, price = ?, image = ?, status = ? WHERE id = ?";
    await connection.query(query, [product.name, product.description, product.price, product.image, product.status, product.id], (err, results) => {
        if (!err){
            if(results.affectedRows == 0){
                return res.status(404).json({mensaje: "El producto con ese id no existe"});
            }else{
                return res.status(200).json({mensaje: "Producto actualizado satisfactoriamente"});
            }
        }else{
            return res.status(400).json({mensaje: err});
        }
    });
}

const del = async (req, res)=>{
    const id = req.params.id;
    const query = "DELETE FROM producto WHERE id = ?";
    await connection.query(query, [id], (err, results) => {
        if (!err){
            if (results.affectedRows == 0){
                return res.status(404).json({mensaje: "El producto con ese id no existe"});
            }else{
                res.status(200).json({mensaje: 'Registro eliminado satisfactoriamente'});
            }
            
        }else{
            res.status(400).json({mensaje: err});
        }
    });
}

module.exports = {
    getAll,
    add,
    getById,
    update,
    del
}