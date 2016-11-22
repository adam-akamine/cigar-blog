'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pics = sequelize.define('Pics', {
    filename: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Pics;
};