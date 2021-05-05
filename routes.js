const { Router } = require('express');
const Task = require('./controller/TaskController');
const routes = new Router();

routes.get('/', Task.Index);
routes.get('/show/:taskId', Task.Show);

routes.post('/', Task.Create);

module.exports = routes;