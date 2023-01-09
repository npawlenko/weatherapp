'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('City', [
        {
          name: 'Białystok',
          countryCode: 'pl',
          state: 'Podlaskie',
          lat: 53.13333,
          lon: 23.16433,
          visits: 0
        },
        {
          name: 'Hajnówka',
          countryCode: 'pl',
          state: 'Podlaskie',
          lat: 52.74328,
          lon: 23.58122,
          visits: 0
        },
        {
          name: 'Londyn',
          countryCode: 'gb',
          lat: 51.509865,
          lon: -0.118092,
          visits: 0
        }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('City', null, {});
  }
};
