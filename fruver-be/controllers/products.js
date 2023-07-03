import { Product } from "../models/product.js";

export const getAll = async (req, res)=>{
    try{
        const products = await Product.findAll();
        return res.status(200).json(products);
    }catch (err){
        return res.status(400).json({message: err});
    }
}

export const add = async (req, res)=>{
    const product = req.body;
    try{
        await Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            available: product.available
        });
        return res.status(200).json({message: "Producto agregado satisfactoriamente"});
    }catch(err){
        return res.status(400).json({message: "Producto no se pudo agregar"});
    }
}

export  const getById = async (req, res)=>{
    const id = req.param.id;
    try{
        const product = await Product.findByPk(id);
        return res.status(200).json(product);
    }catch{
        return res.status(400).json({message: "El producto con ese id no existe"});
    }
}

export  const update = async(req, res)=>{
    const product = req.body;
    try{
        await Product.update({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            available: product.available
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

export  const del = async (req, res)=>{
    const id = req.params.id;   
    try{
        await Product.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json({message: 'Producto eliminado satisfactoriamente'});
    }catch{
        return res.status(400).json({message: "Producto no eliminado"});
    }
}