import { User } from '../models/users.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const login = async (req, res) => {
    const user = req.body;
    try{    
        const userFound = await User.findOne({
            where: {
                email: user.email
            }
        });
        if (userFound){
            if (userFound.password != user.password ){
                return res.status(401).json({message: "Correo y/o contraseña incorrectos"});
            }else if(userFound.password == user.password){
                const response = { email: userFound.email, role: userFound.role};
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '18h'})
                return res.status(200).json({token: accessToken});
            }else{
                return res.status(400).json({message: "Algo salió mal. Por favor intente más tarde"});
            }
        }else{
            return res.status(500).json({message: "Usuario no existe"});
        }
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getAll = async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }catch (err){
        res.status(400).json({message: err});
    }
}

export const add = async (req, res) => {
    const user = req.body;
    try{    
        const userFound = await User.findOne({
            where: {
                email: user.email
            }
        });
        if (!userFound){
            try{
                await User.create({
                    userName: user.nameName,
                    contactNumber: user.contactNumber,
                    email: user.email,
                    password: user.password,
                    role: user.role
                });
                return res.status(200).json({message: "Usuario registrado satisfactoriamente"});
            }catch(err){
                return res.status(400).json({message: "Error al regstrar un usuario"});
            }
        }else{
            return res.status(400).json({message: "Un usuario con ese email ya existe"})
        }
    }catch(err){
        return res.status(400).json({message: err});
    }
}

export const update = async (req, res) => {
    const user = req.body;
    try{
        await User.update({
            userName: user.userName,
            contactNumber: user.contactNumber,
            email: user.email,
            role: user.role
        },{
            where: {
                id: product.id
            }
        });
        return res.status(200).json({message: "Usuario actualizado satisfactoriamente"});
    }catch(err){
        return res.status(400).json({message: "Usuario no actualizado"});
    }
}