'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Locations', [{
      name: 'GB',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'IN',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'US',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
