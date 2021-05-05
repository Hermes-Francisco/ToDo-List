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
}
module.exports = new TaskController();