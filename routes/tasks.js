const router = require('express').Router()
const authMiddleware = require('../middleware/verify-token')

const {
   getAllTasks,
   createATask,
   updateATask
} = require('../controllers/tasks')

// the following are private routes so it is only after the middleware **authMiddleware** has verfied user they can now have access to this route
router.route('/create-task').post(authMiddleware, createATask)
router.route('/tasks').get(authMiddleware, getAllTasks)
router.route('/update-task').post(authMiddleware, updateATask)


module.exports = router;