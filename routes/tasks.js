const router = require('express').Router()
const authMiddleware = require('../middleware/verifyToken')

const {
   getAllTasks
} = require('../controllers/tasks')

// get all task is a private route so it is only after the middleware **authMiddleware** has verfied user they can now have access to this route
router.route('/').get(authMiddleware, getAllTasks)

module.exports = router;