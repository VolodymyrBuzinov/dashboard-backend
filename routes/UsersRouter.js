const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserControllers');
const guard = require('../helpers/Guard');

router.post('/signup', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', guard, userControllers.logout);
router.get(
  '/verify/:verificationToken',
  userControllers.verification,
);
router.post('/verify', userControllers.sendNewMail);
// router.get('/current', guard, userController.current);

module.exports = router;
