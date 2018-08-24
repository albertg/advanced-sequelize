'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    employeeId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mentorId: DataTypes.INTEGER,
    profileImage: DataTypes.STRING,
    practiceManagerId: DataTypes.INTEGER,
    designation: DataTypes.STRING,
    competency: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    gender: DataTypes.STRING,
    practiceId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(User,{
      as: 'PracticeManager',
      foreignKey: 'practiceManagerId'
    });
    User.belongsTo(User,{
      as: 'Mentor',
      foreignKey: 'mentorId'
    });
    User.belongsTo(models.Location,{
      as: 'Location'
    });
    User.belongsTo(models.Practice,{
      as: 'ManagersPractice',
      foreignKey: 'practiceId'
    });
    User.hasOne(models.Practice,{
      as: 'Practice',
      foreignKey: 'practiceHeadId'
    });
    User.belongsToMany(models.Role, {
      as: 'Roles', 
      through:'UserRoles', 
      foreignKey:'userId'
    });
    User.hasMany(models.User,{
      as: 'PracticeManagerReportees',
      foreignKey: 'practiceManagerId'
    });
    User.hasMany(models.User,{
      as: 'Mentees',
      foreignKey: 'mentorId'
    });
  };
  return User;
};