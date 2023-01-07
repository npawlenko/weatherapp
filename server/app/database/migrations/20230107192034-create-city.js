'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('City', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            countryCode: {
                type: Sequelize.STRING,
                allowNull: false
            },
            state: {
                type: Sequelize.STRING,
            },
            lat: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            lon: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            visits: {
                type: Sequelize.BIGINT,
                defaultValue: 0
            }
        }).then(() => queryInterface.addIndex('City', ["name"]));
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('City');
    }
};