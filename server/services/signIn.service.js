const client = require("../database");

const signInUser = async ({ email, name, picture }) => {
    let user = await client.db().collection('Users').findOne({ email });
    /** if it is new user insert in the DB */
    if (!user) {
        user = await client.db().collection('Users').insertOne({
            email,
            name,
            picture
        });
    }
    console.log('User ', user);
};

module.exports = signInUser;