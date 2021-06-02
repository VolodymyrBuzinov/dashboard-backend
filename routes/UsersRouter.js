const express = require('express');
const router = express.Router();
const guard = require('../helpers/Guard');

router.get('/current', guard, userController.current);
router.get('/verify/:verificationToken', userController.verification);
router.post('/verify', userController.sendNewMail);
router.post('/signup', userController.reg);
router.post('/login', userController.login);
router.post('/logout', guard, userController.logout);
router.patch('/', guard, userController.subscription);

module.exports = router;
