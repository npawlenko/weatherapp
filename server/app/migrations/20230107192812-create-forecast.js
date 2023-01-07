'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Forecast', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'City',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      main: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      temperature: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      temperatureFeelsLike: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      humidity: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      cloudiness: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pressure: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      windSpeed: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      windDeg: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visibility: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rain: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      snow: {
        type: Sequelize.DOUBLE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Forecast');
  }
};