const sequelize = require("../database");

const signInUser = async ({ email, name, picture }) => {
    const UserModel = sequelize.models.Users;
    let user = await UserModel.findOne({ email });
    
    if (!user) {
        /** if it is new user insert in the DB */
        user = await UserModel.create({
            email,
            name,
            picture
        });
    } else {
        /** else update user */
        user.name = name;
        user.picture = picture;
        await user.save();
    }
    console.log('User ', user);
};

module.exports = signInUser;