'use strict';
module.exports = (sequelize, DataTypes) => {
    const Metric = sequelize.define('metric', {
        id: { 
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true 
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
       /**  range: {
            type: DataTypes.STRING,
            allowNull: true
        },*/
        geoLatitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        geoLongitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        sensorExternalId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        read:{
            type: DataTypes.BOOLEAN,
            allowNull:true,
            defaultValue: false,
        }, 
    }, {
        freezeTableName: true,
    });

    return Metric;
};
