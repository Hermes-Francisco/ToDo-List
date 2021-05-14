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
        }).catch((err)=>{
            return res.status(500).json({"erro": err.message})
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

        let order = await Task.count({
            where:{
                completed:false
            }
        }) + 1;
        
        await Task.create({
            taskName,
            details,
            order
        }).catch((err)=>{
            return res.status(500).json({"erro" : err.message});
        });
        
        return res.status(200).json({"message":"Tarefa criada com sucesso"})
    }

    async Count(req, res){
        return res.json(await Task.count({
            where:{
                completed:false
            }
        }))
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

    async toOrder(req, res){
        const { id, newOrder } = req.body;

        let task = await Task.findByPk(id);

        if(newOrder == task.order || !newOrder || isNaN(newOrder)){
            return res.status(200).json({"message": "não foi reordenado"})
        }
    
        let taskList = await Task.findAndCountAll({
            where:{
                completed: false
            },
            order: [['order', 'asc']]
        })
        
        //retirando a tarefa do lugar

        for(var i = taskList.count -1; i > task.order-1; i--){
            let row = taskList.rows[i];
            row.update({order: row.order - 1})
        }
        task.update({
            completed: true
        });

        //colocando a task no lugar novo

        taskList = await Task.findAndCountAll({
            where:{
                completed: false
            },
            order: [['order', 'asc']]
        })

        for(var i = taskList.count -1; i >= newOrder-1; i--){
            let row = taskList.rows[i];
            row.update({order: row.order + 1})
        }
        
        let tarefa = task.update({
            order:newOrder,
            completed: false
        });

        return res.status(200).json(tarefa)
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

            return res.status(200).json({ "message":"Todas tarefas cumpridas foram deletadas" })
        }

        await task.destroy().catch((err)=>{
            return res.status(500).json({"erro": err.message})
        });

        return res.status(200).json({ "message":"Tarefa deletada" })
    }
}
module.exports = new TaskController();
