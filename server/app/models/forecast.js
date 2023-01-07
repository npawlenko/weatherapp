
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Forecast extends Model {
        static associate(models) {
            this.belongsTo(models.City);
        }
    }
    Forecast.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        main: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temperature: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        temperatureFeelsLike: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        humidity: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        cloudiness: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pressure: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        windSpeed: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        windDeg: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        visibility: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rain: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        snow: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Forecast',
    });
    return Forecast;
};