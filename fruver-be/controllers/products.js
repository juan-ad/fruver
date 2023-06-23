const Product = require("../models/products");

const getAll = async (req, res)=>{
    try{
        const products = await Product.findAll();
        return res.status(200).json(products);
    }catch (err){
        return res.status(400).json({message: err});
    }
}

const add = async (req, res)=>{
    const product = req.body;
    try{
        await Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            iamge: product.image,
            status: 'true'
        });
        return res.status(200).json({message: "Producto agregado satisfactoriamente"});
    }catch(err){
        return res.status(400).json({message: "Producto no se pudo agregar"});
    }
}

const getById = async (req, res)=>{
    const id = req.param.id;
    try{
        const product = await Product.findByPk(id);
        return res.status(200).json(product);
    }catch{
        return res.status(400).json({message: "El producto con ese id no existe"});
    }
}

const update = async(req, res)=>{
    const product = req.body;
    try{
        await Product.update({
            name: product.name,
            description: product.description,
            price: product.price,
            iamge: product.image,
            status: product.satus
        },{
            where: {
                id: product.id
            }
        });
        return res.status(200).json({message: "Producto actualizado satisfactoriamente"});
    }catch(err){
        return res.status(400).json({message: "Producto no se pudo actualizar"});
    }
}

const del = async (req, res)=>{
    const id = req.params.id;   
    try{
        await Product.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json({message: 'Registro eliminado satisfactoriamente'});
    }catch{
        return res.status(400).json({message: "Registro no eliminado"});
    }
}

module.exports = {
    getAll,
    add,
    getById,
    update,
    del
}