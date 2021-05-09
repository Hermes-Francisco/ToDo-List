const Task = require('../model/Task');

class Reorder{

    async toComplete(req, res, next){
        const { id, completed } = req.body;

        let task = await Task.findByPk(id)

        req.body.task = task
    
        if(!completed)return next()
    
        let taskList = await Task.findAndCountAll({
            where:{
                completed: false
            },
            order: [['order', 'asc']]
        })
            
        for(var i = taskList.count -1; i > task.order-1; i--){
            let row = await Task.findByPk(taskList.rows[i].id)
            await row.update({order: row.order - 1})
        }
        return next();
    }

    async toDelete(req, res, next){
        const { id, completed } = req.body;

        if(completed)return next();

        console.log('test1')

        let task = await Task.findByPk(id)

        req.body.task = task;

        if(!task ||task.completed)return next();
    
        let taskList = await Task.findAndCountAll({
            where:{
                completed: false
            },
            order: [['order', 'asc']]
        })
            
        for(var i = taskList.count -1; i > task.order-1; i--){
            let row = await Task.findByPk(taskList.rows[i].id)
            await row.update({order: row.order - 1})
        }
        return next();
    }
}

module.exports = new Reorder();