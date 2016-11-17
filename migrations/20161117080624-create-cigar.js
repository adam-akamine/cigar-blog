'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Cigars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      review_id: {
        type: Sequelize.INTEGER
      },
      blender: {
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
      stars: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Cigars');
  }
};