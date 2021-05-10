const Task = require('../model/Task');

class TaskController{

    constructor(){
        Task.sync({force: false})
    }

    async Index(req, res){
        const { completed } = req.params;

        if(completed == "true"){
            const task = await Task.findAll({
                where:{
                    completed: true
                },
                order: [['updatedAt', 'desc']]
            }).catch((err)=>{
                return res.status(500).json({"erro": err.message})
            })
            return res.status(200).json(task);
        }

        const task = await Task.findAll({
            where:{
                completed: false
            },
            order:[['order', 'asc']]
        });
        return res.status(200).json(task);
    }

    async Show(req, res){
        const { taskId } = req.params;
        let task = await Task.findByPk(taskId);
        return res.status(200).json(task)
    }

    async Create(req, res){
        const { taskName, details } = req.body;

        let order = await Task.count() + 1;
        
        let task = await Task.create({
            taskName,
            details,
            order
        }).catch((err)=>{
            return res.status(500).json({"erro" : err.message});
        });
        
        return res.status(200).json(task)
    }

    async Update(req, res){
        const { task, taskName, details, completed } = req.body;
        let { order } = req.body;

        if(completed)order = null;
        if(completed === false && task.completed){
            order = await Task.count({
                where:{
                    completed:false
                }
            }) + 1
        }

        await task.update({
            taskName,
            details,
            order,
            completed
        }).catch((err)=>{
            return res.status(500).json({"erro" : err.message});
        })

        return res.status(200).json({"message":"Tarefa atualizada"});
    }

    async Delete(req, res){
        const { task, completed } = req.body;

        if(completed){
            
            await Task.destroy({ 
                where: {
                    completed 
                }
            }).catch((err)=>{
                return res.status(500).json({"erro": err.message});
            });

            return res.status(200).json({ "message":"todas tarefas cumpridas foram deletadas" })
        }

        await task.destroy().catch((err)=>{
            return res.status(500).json({"erro": err.message})
        });

        return res.status(200).json({ "message":"tarefa deletada" })
    }
}
module.exports = new TaskController();