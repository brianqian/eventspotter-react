const router = require('express').Router();
const authController = require('../controllers/authController');

// router.route('/login').post(authController.login);
router.route('/signup').post(authController.signUp);
router.route('/google-signin').get(authController.googleSignIn);

module.exports = router;
