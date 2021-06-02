const codes = require('../helpers/Codes');
const userService = require('../services/user/UserServices');

const register = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.getByEmail(email);
  if (user) {
    return next({
      status: codes.CONFLICT,
      message: 'Email in use',
      data: 'Conflict',
    });
  }
  try {
    const newUser = await userService.addUser(req.body);
    return res.status(codes.CREATED).json({
      status: 'success',
      code: codes.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
