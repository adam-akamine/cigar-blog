'use strict';
module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    author_id: DataTypes.INTEGER,
    cigar_id: DataTypes.INTEGER,
    reviewText: DataTypes.TEXT,
    reviewDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        models.Review.belongsTo(models.Author, {
          foreignKey: 'author_id',
          targetKey: 'id',
          as: 'author'
        });
      }
    }
  });
  return Review;
};