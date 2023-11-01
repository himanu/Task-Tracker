const { DataTypes } = require('sequelize');

const UserModel = (sequelize) => 
sequelize.define('Users', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
    }
});

module.exports = UserModel;