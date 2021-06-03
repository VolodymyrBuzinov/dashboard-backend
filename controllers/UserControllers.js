const codes = require('../helpers/Codes');
const { UserService } = require('../services/user/UserServices');
const { AuthService } = require('../services/user/AuthService');

const userService = new UserService();
const authService = new AuthService();

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
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    if (token) {
      return res.status(codes.OK).json({
        status: 'success',
        code: codes.OK,
        data: {
          ...token,
        },
      });
    }
    next({
      status: codes.UNAUTHORIZED,
      message: 'Email or password is wrong',
      data: 'Unauthorized',
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await authService.logout(userId);
    return res.status(codes.NO_CONTENT).json({
      status: 'Success',
      message: 'Success logout',
      code: codes.NO_CONTENT,
    });
  } catch (error) {
    next(error);
  }
};
const verification = async (req, res, next) => {
  try {
    const result = await userService.verification(req.params);
    if (result) {
      return res.status(codes.OK).json({
        status: 'success',
        code: codes.OK,
        data: {
          message: 'Verification successful',
        },
      });
    }
    return next({
      message: 'User not found',
    });
  } catch (error) {
    next(error);
  }
};
const sendNewMail = async (req, res, next) => {
  try {
    const result = await userService.sendNewMail(req.body);
    if (result) {
      return res.status(codes.OK).json({
        status: 'success',
        code: codes.OK,
        data: {
          message: 'Verification email sent',
        },
      });
    }
    return next({
      message: 'Verification has already been passed',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  login,
  logout,
  verification,
  sendNewMail,
};
