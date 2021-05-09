const Task = require('../model/Task');

class TaskController{

    constructor(){
        Task.sync({force: false})
    }

    async Index(req, res){
        const { completed } = req.body;

        if(completed){
            const task = await Task.findAll({
                where:{
                    completed
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
        const { id, taskName, details, completed } = req.body;
        var { order } = req.body;

        if(completed)order = null;

        let task = await Task.update({
            taskName,
            details,
            order,
            completed
        }, {
            where: { 
                id 
            }
        }).catch((err)=>{
            return res.status(500).json({"erro" : err.message});
        })

        return res.status(200).json(task);
    }

    async Delete(req, res){
        const { id, completed } = req.body;

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

        await Task.destroy({ 
            where:{ 
                id 
            }
        }).catch((err)=>{
            return res.status(500).json({"erro": err.message})
        });

        return res.status(200).json({ "message":"tarefa deletada" })
    }
}
module.exports = new TaskController();