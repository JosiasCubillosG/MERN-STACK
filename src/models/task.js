const mongoose = require("mongoose");
//nos permite definir el esquema de la BD
const {Schema} = mongoose;

const TaskSchema = new Schema({
    title: {type:String, required:true},
    description: {type: String, required:true}
});
//aqui el taskchema es como van a lucir mis datos y el task es como voy a manejarlos en mi app
module.exports = mongoose.model("Task", TaskSchema);