//define las operaciones de las urls que vamos a definir en el servidor
const express = require("express")
const router = express.Router()
//aca obtengo el modelo y puedo hacer consultas a la BD
const Task = require("../models/task")

router.get("/", async (request,response) => {
    const tasks = await Task.find();
    response.json(tasks)
})

router.get("/:id", async (request,response)=>{
    const task = await Task.findById(request.params.id)
    response.json(task)
})

router.post("/", async (request,response) => {
    const {title,description} = request.body;
    const task = new Task({title,description});
    await task.save()
    response.json({"Status": "Task saved"})

})

router.put("/:id", async (request,response) => {
    const {title, description} = request.body;
    const newTask = {title,description}
    await Task.findByIdAndUpdate(request.params.id, newTask)
    response.json({"status": "task update"})
})

router.delete("/:id", async(request,response)=>{
    await Task.findByIdAndRemove(request.params.id);
    response.json({"status": "task deleted"})
})

module.exports = router;
