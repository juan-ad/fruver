const connection = require('../connection');

const getProductos = async (req, res)=>{
    console.log("asdasd");
    await connection.query("SELECT * FROM producto", (err, data) => {
        if (err){
            console.log(err);
            res.status(400).json({mensaje: err});
        }else{
            res.status(200).json(data);
        }
    });
}

const postProductos = async (req, res)=>{
    const {nombre, detalle} = req.body;
    await connection.query(`INSERT INTO producto(nombre, detalle) VALUES('${nombre}', '${detalle}')`, (err, data) => {
        if (err){
            console.log(err);
            res.status(400).json({mensaje: err});
        }else{
            res.status(200).json({
                body: {
                    nombre, 
                    detalle       
                }
            });
        }
    });
}

const putProductos = async(req, res)=>{
    const { idProducto } = req.params;
    const { nombre, detalle } = req.body;
    await connection.query(`UPDATE producto set nombre='${nombre}', detalle='${detalle}' WHERE id='${idProducto}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(400).json({mensaje: err});
        }else{
            res.status(200).json({
                body: {
                    nombre, 
                    detalle       
                }
            });
        }
    });
}

const deleteProductos = async (req, res)=>{
    const { idProducto } = req.params;
    await connection.query(`DELETE FROM producto WHERE id = '${idProducto}'`, (err, data) => {
        if (err){
            console.log(err);
            res.status(400).json({mensaje: err});
        }else{
            res.status(200).json({mensaje: 'Registro eliminado satisfactoriamente'});
        }
    });
}

module.exports = {
    getProductos,
    postProductos,
    putProductos,
    deleteProductos
}