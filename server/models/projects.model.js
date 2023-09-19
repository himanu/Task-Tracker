const { DataTypes } = require('sequelize');

const ProjectModel = (sequelize) =>
    sequelize.define('Projects', {
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
        user_id: {
            type: DataTypes.BIGINT,
            references: {
                model: "Users",
                key: "id"
            },
            allowNull: false
        }
    }, {
        tableName: "projects"
    });

module.exports = ProjectModel;