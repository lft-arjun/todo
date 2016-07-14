'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('roles', [
            { id: 1, name: "Admin", description: 'System Admin',createdAt: Date.now(), updatedAt: Date.now() },
            { id: 2, name: "Author", description: 'Blog Author',createdAt: Date.now(), updatedAt: Date.now() }
      ], {});
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
      return queryInterface.bulkDelete('roles', null, {});
  }
};
