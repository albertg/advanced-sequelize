'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'practiceId', {
      type: Sequelize.INTEGER,
      references:{
        model:'Practices',
        key:'id'
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Users', 'practiceId');
  }
};
