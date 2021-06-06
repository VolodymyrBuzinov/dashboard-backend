const codes = require('./Codes');
const UserModel = require('../schemas/UserSchema');
const SessionModel = require('../schemas/SessionSchema');
const jwt = require('jsonwebtoken');

const guard = async (req, res, next) => {
  const authorizationHeader = req.get('Authorization');
  if (authorizationHeader) {
    const accessToken = authorizationHeader.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.JWT_KEY);
    } catch (err) {
      console.log(err);
      return next({
        status: codes.UNAUTHORIZED,
        message: 'Unauthorized',
        data: 'UNAUTHORIZED',
      });
    }
    const user = await UserModel.findById(payload.uid);
    const session = await SessionModel.findById(payload.sid);
    if (!user) {
      return next({
        status: codes.UNAUTHORIZED,
        message: 'Invalid user',
        data: 'UNAUTHORIZED',
      });
    }
    if (!session) {
      return next({
        status: codes.UNAUTHORIZED,
        message: 'Invalid session',
        data: 'UNAUTHORIZED',
      });
    }
    req.user = user;
    req.session = session;
    next();
  } else
    return res.status(400).send({ message: 'No token provided' });
};
module.exports = guard;
