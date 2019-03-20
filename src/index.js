//archivo que me permitira inicializar el servidor

const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");


const { mongoose } = require("./database");

//Settings
//process.env.PORT quiere decir que tome el puerto que brinda el servicio de la nube
app.set("port", process.env.PORT || 3000);


//Middlewares "funciones que se ejecutan antes de que lleguen a las rutas"
//Morgan permite ver en la consola las peticiones que hay en el navegador
app.use(morgan("dev"));
//Aca se asegura que cada vez que llegue un dato al servidor paSa por esta funcion
//y esta funcion comprueba que el dato sea un formato json
app.use(express.json());


//Routes
app.use("/api/tasks", require("./routes/task.routes"));



//Static files "archivos estaticos de la carpeta public"
app.use(express.static(path.join(__dirname,"public")))

//Starting server
app.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`);
});