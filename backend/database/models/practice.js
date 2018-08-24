'use strict';
module.exports = (sequelize, DataTypes) => {
  const Practice = sequelize.define('Practice', {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    },
    businessUnitId: DataTypes.INTEGER,
    practiceHeadId: DataTypes.INTEGER    
  }, {});
  Practice.associate = function(models) {
    Practice.belongsTo(models.BusinessUnit,{
      as: 'BusinessUnit'
    });
    Practice.belongsTo(models.User,{
      as: 'PracticeHead'
    });
    Practice.hasMany(models.User,{
      as: 'PracticeManagers'
    });
  };
  return Practice;
};