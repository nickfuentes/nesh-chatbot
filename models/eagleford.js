'use strict';
module.exports = (sequelize, DataTypes) => {
  const Eagleford = sequelize.define('Eagleford', {
    api14: DataTypes.FLOAT,
    wellName: DataTypes.STRING,
    wellNumber: DataTypes.STRING,
    leaseName: DataTypes.STRING,
    operatorAlias: DataTypes.STRING,
    operatorReported: DataTypes.STRING,
    field: DataTypes.STRING,
    countyParish: DataTypes.STRING,
    diBasin: DataTypes.STRING,
    diPlay: DataTypes.STRING,
    wellStatus: DataTypes.STRING,
    cumBoe: DataTypes.FLOAT,
    surfaceHoleLongitude: DataTypes.FLOAT,
    surfaceHoleLatitude: DataTypes.FLOAT
  }, {});
  Eagleford.associate = function(models) {
    // associations can be defined here
  };
  return Eagleford;
};