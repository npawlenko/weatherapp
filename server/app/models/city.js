'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            this.hasMany(models.Forecast);
        }
    }
    City.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        countryCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        lon: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        visits: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'City',
        timestamps: false,
        modelName: 'City',
        indexes: [
            {
                fields: ["name"]
            }
        ],
    });
    return City;
};