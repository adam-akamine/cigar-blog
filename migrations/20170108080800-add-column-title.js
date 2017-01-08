'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Reviews',
      'title',
      Sequelize.STRING)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Reviews');
  }
};
