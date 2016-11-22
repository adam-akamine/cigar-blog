'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      reviewText: {
        type: Sequelize.TEXT
      },
      reviewDate: {
        type: Sequelize.DATE
      },
      cigarName: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      shape: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      flavors: {
        type: Sequelize.TEXT
      },
      smokeTime: {
        type: Sequelize.STRING
      },
      picFileName: {
        type:Sequelize.INTEGER,
          allowNull: true,
          foreignKey: true,
          references:{
            model: "Pics",
            key: "id"
        }
      },
      grade: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Reviews');
  }
};