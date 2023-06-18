require('dotenv').config();
const app = require('./index');

app.listen(process.env.PORT, () =>{
    console.log("Servidor escuchando por el puerto 3000");
})