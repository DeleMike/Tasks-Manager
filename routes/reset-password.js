const router = require('express').Router()

const {
   resetPasswordClient
} = require('../controllers/reset-password')

router.route('/reset-password').get(resetPasswordClient)

module.exports = router;