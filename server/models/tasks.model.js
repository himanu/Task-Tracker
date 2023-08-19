const { DataTypes } = require('sequelize');

const TaskModel = (sequelize) =>
    sequelize.define('Tasks', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        project_id: {
            type: DataTypes.BIGINT,
            references: {
                model: "Projects",
                key: "id"
            },
            allowNull: false
        }
    });

module.exports = TaskModel;