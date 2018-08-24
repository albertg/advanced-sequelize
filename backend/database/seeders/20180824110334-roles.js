'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Roles',[{
      name:'admin',
      priority: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name:'practicehead',
      priority: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name:'practicemanager',
      priority: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'mentor',
      priority: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'mentee',
      priority: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
