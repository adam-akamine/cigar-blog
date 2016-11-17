'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cigar = sequelize.define('Cigar', {
    name: DataTypes.STRING,
    review_id: DataTypes.INTEGER,
    blender: DataTypes.STRING,
    size: DataTypes.STRING,
    shape: DataTypes.STRING,
    price: DataTypes.STRING,
    flavors: DataTypes.TEXT,
    smokeTime: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Cigar.hasMany(models.Review, {
          foreignKey: 'review_id'
        });
      }
    }
  });
  return Cigar;
};