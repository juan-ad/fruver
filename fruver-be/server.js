require('dotenv').config();
const sequelize = require('./database/database');
const app = require('./index');

// Test a base de datos
const testDb = async() => {
    try {
        await sequelize.authenticate();
        console.log('Conexión realizada con éxito');
        // Correr el servicio por puerto 3000
        app.listen(process.env.PORT, () =>{
            console.log("Servidor escuchando por el puerto 3000");
        })
    } catch (error) {
        console.error('Error al realizar la conexión:', error);
    }
}
testDb();