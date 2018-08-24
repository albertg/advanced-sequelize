'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      employeeId: 'HM0000001',
      firstName: 'deepti',
      lastName: 'moolya',
      email: 'Deepti.Moolya@happiestminds.com',
      designation: 'SENIOR MANAGER-CORPORATE',
      competency: 'C6',
      locationId: 2,
      title: 'SENIOR MANAGER',
      gender: 'FEMALE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
