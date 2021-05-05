const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');

class Teste extends Model {}

Teste.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },  
  tarefa: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Teste'
});

module.exports = Teste;