const sequelize = require("../database");
const jwt = require("jsonwebtoken");

const signInUser = async ({ email, name, picture }) => {
    const UserModel = sequelize.models.Users;
    let user = await UserModel.findOne({ where: {email} });
    if (!user) {
        /** if it is new user insert in the DB */
        user = await UserModel.create({
            email,
            name,
            picture
        });
        console.log("Created a user");
    } else {
        /** else update user */
        user.name = name;
        user.picture = picture;
        await user.save();
        console.log("Updated user");
    }
    return user;
};

const createToken = (userId) => jwt.sign(
    {
        user_id: userId,
    },
    process.env.TOKEN_SECRET_KEY,
    {
        expiresIn: "24h",
    }
)
module.exports = {
    signInUser,
    createToken
};