const { Router } = require('express');
const Task = require('./controller/TaskController');
const orderChange = require('./middlewares/orderChange')
const Pages = require('./pages')
const routes = new Router();

routes.get('/', Pages.Index);
routes.get('/view/:file', Pages.Components);

routes.get('/todo/', Task.Index);
routes.get('/show/:taskId', Task.Show);

routes.post('/', Task.Create);
routes.put('/', orderChange,Task.Update);
routes.delete('/', Task.Delete);

module.exports = routes;