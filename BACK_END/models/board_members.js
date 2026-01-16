'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board_Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Board_Members.belongsTo(models.User,{foreignKey:'id_user'});

       Board_Members.belongsTo(models.Board,{foreignKey:'id_board'});
    }
  }
  Board_Members.init({
    id_user: DataTypes.INTEGER,
    id_board: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board_Members',
  });
  return Board_Members;
};