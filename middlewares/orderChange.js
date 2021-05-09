const Task = require('../model/Task');

module.exports = async (req, res, next)=>{
    const { id, order, completed } = req.body;

    if(order==null && !completed)return next()

    let taskList = await Task.findAndCountAll({
        where:{
            completed: false
        },
        order: [['order', 'asc']]
    })

    if(completed || order == 0){
        let task = await Task.findByPk(id)
        
        for(var i = taskList.count -1; i > task.order-1; i--){
            let row = await Task.findByPk(taskList.rows[i].id)
            await row.update({order: row.order - 1})
        }
        return next();
    }

    return res.json({order})
}