const { signInUser, createToken } = require("../services/signIn.service");

const signInController = async (req, res) => {
    try {
        const payload = req.auth;
        const user = await signInUser(payload);
        console.log("user ", user);
        const { email, name, picture, id } = user;
        const token = createToken(id);
        res.status(200).send({
            success: true,
            token,
            user: { email, name, picture }
        });
    } catch (err) {
        console.log('Error occured ', err.message);
        res.status(500).send({
            error: err.message
        });
    }
};
module.exports = signInController;