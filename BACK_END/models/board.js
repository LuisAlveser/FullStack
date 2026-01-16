'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Board.belongsTo(models.User, {
    foreignKey: 'id_owner',
   
  });
    Board.hasMany(models.Column, {
    foreignKey: 'id_board',
    onDelete:"CASCADE"
  });
   Board.belongsToMany(models.User,{through:models.Board_Members,foreignKey:"id_board"});

    }
  }
  Board.init({
    title: DataTypes.STRING,
    id_owner: DataTypes.INTEGER,
     status: DataTypes.ENUM("INICIADO", "EM EXECUÇÃO", "TERMINADO")
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};