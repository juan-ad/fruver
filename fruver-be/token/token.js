import jwt from 'jsonwebtoken';

// Authorization: Bearer <token>
export function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    
    // Verificamos que el encabezado tenga la propiedad authorization
    if (!bearerHeader){
        return res.status(401).json("No autorizado");
    }

    const bearerToken = bearerHeader.split(" ")[1];
    // verificamos que el token sea válido
    jwt.verify(bearerToken, "SECRET", (err, response) => {
        if (err){
            return res.sendStatus(403);
        }else{
            res.locals = response;
            // Permite avanzar a la siguiente función
            next();     
        }
    });
}