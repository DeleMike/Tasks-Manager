const router = require('express').Router()

const {
   verifyUserClient
} = require('../controllers/verify-user')

router.route('/verify-user').get(verifyUserClient)

module.exports = router;