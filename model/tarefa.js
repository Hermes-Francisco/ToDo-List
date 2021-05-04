const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');

class Tarefa extends Model {}

Tarefa.init({
  // Model attributes are defined here
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },  
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Tarefa'
});

module.exports = Tarefa;