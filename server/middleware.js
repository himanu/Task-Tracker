const { OAuth2Client } = require('google-auth-library');
const sequelize = require('./database');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require("jsonwebtoken");

function verifyIdToken(req, res, next) {
    const tokenId = req?.headers?.authorization?.split(" ")?.[1] ?? ""
    if (!tokenId)
        return res.status(401).send({
            error: "Please send token id"
        })
    client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID
    }).then(({ payload }) => {
        console.log('Authentication successful ', payload);
        req.auth = payload;
        next();
    }).catch((err) => {
        console.log('Authentication failed ', err.message);
        res.status(401).send({
            error: 'Authentication Failed'
        });
    })
}

const verifyJwtToken = async (req, res, next) => {
    try {
        /** read token from req */
        const token = req.headers.authorization?.split(" ")?.[1];
        if (!token)
            return res.status(401).send({
                error: "Please send JWT token"
            })

        /** decrypt token */
        const { user_id } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        /** get user */
        const user = await sequelize.models.Users.findOne({
            where: {
                id: user_id
            }
        });
        if (!user)
            return res.status(401).send({
                error: "Invalid token"
            })

        /** add user info in req object */
        req.user = user;
        /** forward the request to next middleware/controller */
        next();
    } catch (err) {
        console.log("error ", err);
        next({
            status: 400,
            message: err.message
        })
    }
};
module.exports = { verifyIdToken, verifyJwtToken };