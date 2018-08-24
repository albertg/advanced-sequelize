'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeId: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      mentorId: {
        type: Sequelize.INTEGER
      },
      profileImage: {
        type: Sequelize.STRING
      },
      practiceManagerId: {
        type: Sequelize.INTEGER
      },
      designation: {
        type: Sequelize.STRING
      },
      competency: {
        type: Sequelize.STRING
      },
      locationId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Locations',
          key:'id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      gender: {
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
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};