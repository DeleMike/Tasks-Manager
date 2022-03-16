const router = require('express').Router()
const {
   registerUser
} = require('../controllers/auth')

// register route
router.route('/register').post(registerUser);

module.exports = router;