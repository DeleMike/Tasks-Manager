const router = require('express').Router()

const {authenticateUser} = require('../middleware/authentication')
const {
   registerUser,
   loginUser,
   verifyUserEmail,
   logoutUser,
   forgotPassword,
   resetPassword
} = require('../controllers/auth')

// register route
router.route('/register').post(registerUser);
router.route('/verify-email').post(verifyUserEmail)
router.route('/login').post(loginUser)
router.route('/logout').delete(authenticateUser, logoutUser)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

module.exports = router;