'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    author: DataTypes.STRING,
    cigarName: DataTypes.STRING,
    reviewText: DataTypes.TEXT,
    reviewDate: DataTypes.DATE,
    cigarName: DataTypes.STRING,
    brand: DataTypes.STRING,
    size: DataTypes.STRING,
    shape: DataTypes.STRING,
    price: DataTypes.STRING,
    flavors: DataTypes.STRING,
    smokeTime: DataTypes.STRING,
    grade: DataTypes.INTEGER,
    picFileName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });
  return Review;
};