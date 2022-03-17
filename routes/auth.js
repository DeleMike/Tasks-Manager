const router = require('express').Router()
const {
   registerUser,
   loginUser,
   logoutUser
} = require('../controllers/auth')

// register route
router.route('/register').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

module.exports = router;