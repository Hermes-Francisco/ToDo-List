const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');

class Tarefa extends Model {}

Tarefa.init({
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },  
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Tarefa'
});

module.exports = Tarefa;