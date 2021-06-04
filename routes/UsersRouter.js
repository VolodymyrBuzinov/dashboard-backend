const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserControllers');
const guard = require('../helpers/Guard');
const {
  validateRegistrationUser,
  validateLoginUser,
  validateVerifyUser,
} = require('../validation/UserValidation');

router.post(
  '/signup',
  validateRegistrationUser,
  userControllers.register,
);
router.post('/login', validateLoginUser, userControllers.login);
router.post('/logout', guard, userControllers.logout);
router.get(
  '/verify/:verificationToken',
  userControllers.verification,
);
router.post(
  '/verify',
  validateVerifyUser,
  userControllers.sendNewMail,
);
// router.get('/current', guard, userController.current);

module.exports = router;
