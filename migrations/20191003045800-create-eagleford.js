'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Eaglefords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      api14: {
        type: Sequelize.FLOAT
      },
      wellName: {
        type: Sequelize.STRING
      },
      wellNumber: {
        type: Sequelize.STRING
      },
      leaseName: {
        type: Sequelize.STRING
      },
      operatorAlias: {
        type: Sequelize.STRING
      },
      operatorReported: {
        type: Sequelize.STRING
      },
      field: {
        type: Sequelize.STRING
      },
      countyParish: {
        type: Sequelize.STRING
      },
      diBasin: {
        type: Sequelize.STRING
      },
      diPlay: {
        type: Sequelize.STRING
      },
      wellStatus: {
        type: Sequelize.STRING
      },
      cumBoe: {
        type: Sequelize.FLOAT
      },
      surfaceHoleLongitude: {
        type: Sequelize.FLOAT
      },
      surfaceHoleLatitude: {
        type: Sequelize.FLOAT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Eaglefords');
  }
};