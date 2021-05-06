const Task = require('../model/Task');

class TaskController{

    async Index(req, res){
        const task = await Task.findAll()
        return res.status(200).json(task)
    }

    async Show(req, res){
        const { taskId } = req.params;
        let task = await Task.findByPk(taskId);
        return res.status(200).json(task)
    }

    async Create(req, res){
        const { taskName, details, startDate, endDate } = req.body;
        
        let task = await Task.create({
            taskName,
            details,
            startDate,
            endDate
        }).catch((err)=>{
            return res.status(500).json({"erro" : err.message});
        });
        
        return res.status(200).json(task)
    }

    async Update(req, res){
        const { id, taskName, details, startDate, endDate, completed } = req.body;

        let task = await Task.update({
            taskName,
            details,
            startDate,
            endDate,
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