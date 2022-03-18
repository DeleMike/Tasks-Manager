const router = require('express').Router()
const {
   registerUser,
   loginUser,
   verifyUserEmail,
   logoutUser
} = require('../controllers/auth')

// register route
router.route('/register').post(registerUser);
router.route('/verify-email').post(verifyUserEmail)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

module.exports = router;