const express = require('express');
const routes = require('./routes');
const sequelize = require('./sequelize')

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.router();
    }

    middlewares(){
        this.app.use(express.json());
    }

    router(){
        this.app.use(routes);
        this.sql = sequelize
    }
}
module.exports = new App().app;