const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {
   BadRequest,
} = require('../errors')
const {
   StatusCodes
} = require('http-status-codes')
const {
   createTaskValidation
} = require('../configs/validation')

/**
 * Return all tasks available in the database
 */
const getAllTasks = (req, res) => {
   res.json({
      posts: {
         title: 'My first post',
         desc: 'Random data you shouldn\'t be able to access without being logged in',
      }
   })
}

/**
 * Create a new task.
 */
const createATask = asyncWrapper(async (req, res) => {

   const {
      error
   } = createTaskValidation(req.body)

   // console.log('Error: ', error);

   if (error) throw new BadRequest(error.details[0].message)

   //get latest id
   const lastdoc = await Task.find().sort({
      _id: -1
   }).limit(1)

   if (lastdoc.length === 0) {
      // if there is no document in the db, create a new task document
      task_id = 1
   } else {
      var task_id = parseInt(lastdoc[0]['_id']);
      task_id = task_id + 1
   }

   const task = new Task({
      _id: task_id,
      title: req.body.title,
      details: req.body.details,
      start: req.body.start,
      due: req.body.due,
      creator: req.body.creator,
      is_overdue: req.body.is_overdue,
      task_events: req.body.task_events,
      status: req.body.status,
   })

   console.log('Task Id: ', task_id);

   // save to db
   await task.save()

   //create a task model
   res.status(StatusCodes.CREATED).send({
      msg: 'Task has been created successfully.',
      task_id: task._id,
      task_events: task.task_events,
   });
})


/**
 * Used to add future task events to a particular task
 */
const updateATask = asyncWrapper(async (req, res, ) => {

   const {
      id
   } = req.body;
   console.log('Id: ', id);

   const task = await Task.findOneAndUpdate({
      _id: id
   }, req.body)

   if (!task) return res.status(StatusCodes.NOT_FOUND).send({
      msg: `No task with id: ${id}`
   })

   res.status(StatusCodes.CREATED).send({
      msg: 'Task has been updated',
      task_id: task._id,
      task: task
   })

})

module.exports = {
   getAllTasks,
   createATask,
   updateATask
}