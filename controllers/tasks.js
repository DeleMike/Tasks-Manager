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
   var task_id = parseInt(lastdoc[0]['task_id']);
   task_id = task_id + 1

   //  // check if task is already in db
   //  const isTaskEventIdExists = await Task.findOne({
   //    email: req.body.task_id
   // })
   // if (isTaskEventIdExists) throw new BadRequest("Event Type already exists.")

   const task = new Task({
      title: req.body.title,
      details: req.body.details,
      start: req.body.start,
      due: req.body.due,
      creator: req.body.creator,
      is_overdue: req.body.is_overdue,
      task_id: task_id,
   })
   console.log('Task Id: ', task_id);

   // save to db
   await task.save()

   //create a task model
   res.status(StatusCodes.CREATED).send({
      msg: 'Task has been created successfully.',
      task_id: task_id,
   });
})

module.exports = {
   getAllTasks,
   createATask
}