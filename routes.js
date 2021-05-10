const { Router } = require('express');
const Task = require('./controller/TaskController');
const Reorder = require('./middlewares/Reorder');
const Pages = require('./pages');
const routes = new Router();

routes.get('/', Pages.Index);
routes.get('/view/:file', Pages.Components);

routes.get('/todo/:completed', Task.Index);
routes.get('/show/:taskId', Task.Show);

routes.post('/', Task.Create);
routes.put('/', Reorder.toComplete, Task.Update);
routes.delete('/', Reorder.toDelete, Task.Delete);

module.exports = routes;