'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Column.belongsTo(models.Board, {
    foreignKey: 'id_board',
    
  });
 
    }
  }
  Column.init({
    title: DataTypes.STRING,
    id_board: DataTypes.INTEGER,
    description: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Column',
  });
  return Column;
};