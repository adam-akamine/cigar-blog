'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
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
    grade: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Reviews.belongsTo(models.Pics, {
          foreignKey: 'picFileName',
          as: 'pic'
        });
      }
    }
  });
  return Reviews;
};