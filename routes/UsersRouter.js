const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserControllers');
const guard = require('../helpers/Guard');
// const guard = require('../helpers/Guard');

router.post('/signup', userControllers.register);
router.post('/login', userControllers.login);
router.post('/logout', guard, userControllers.logout);
// router.get('/current', guard, userController.current);
// router.get('/verify/:verificationToken', userController.verification);
// router.post('/verify', userController.sendNewMail);

// router.patch('/', guard, userController.subscription);

module.exports = router;
