import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

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
                const response = { email: userFound.email, role: userFound.role, userName: userFound.userName};
                const accessToken = jwt.sign(response, "SECRET", {expiresIn: '72h'})
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
                    userName: user.userName,
                    phone: user.phone,
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