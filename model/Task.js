const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },  
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  details:{
    type: DataTypes.STRING(510),
    allowNull: true
  },
  order:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Task'
});

module.exports = Task;