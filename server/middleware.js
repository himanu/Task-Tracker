const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

function verifyToken(req, res, next) {
  const tokenId = req.headers.authorization.split(' ')[1];
  client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID
  }).then(({payload}) => {
      console.log('Authentication successful ',payload);
      req.auth = payload;
      next();
  }).catch((err) => {
      console.log('Authentication failed ',err.message);
      res.status(403).send('Authentication failed');
  })
}
module.exports = {verifyToken};