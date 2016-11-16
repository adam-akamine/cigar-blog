'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Authors', [{
      first_name: 'Adam',
      last_name: 'Akamine',
      bio: "I love to smoke. So much so that I'm creating a virtual 'lounge' for cigar reviews. Welcome.",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Authors', [{
      first_name : 'Adam',
      last_name: 'Akamine'
    }]);
  }
};
