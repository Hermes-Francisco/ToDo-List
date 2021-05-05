const { Sequelize } = require('sequelize');
const sql = require('./config/database');

class database{
    constructor(){
        try{
            this.sequelize = new Sequelize(sql.database, sql.username, sql.password, {
                host: sql.host,
                dialect: sql.dialect,
                logging: false
              });
              this.test();
        }catch(err){
          console.log(err.message) 
          process.exit()         
        }
    }

    async test(){
        try {
            await this.sequelize.authenticate();
            console.log('Conectado ao banco de dados com sucesso.');
          } catch (error) {
            console.log('Falha ao conectar com o banco de dados:', error.message);
            process.exit()
          }
    }
}
  module.exports = new database();