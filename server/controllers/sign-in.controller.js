const signInUser = require("../services/signIn.service");

const signInController = async (req, res) => {
    try {
        const payload = req.auth;
        await signInUser(payload);
        const { email, name, picture } = payload;
        res.status(200).send({
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