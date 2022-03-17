/**
 * Return all tasks available in the database
 */
const getAllTasks = (req, res) => {
   res.json({posts:{
      title: 'My first post',
      desc: 'Random data you shouldn\'t be able to access without being logged in',
   }})
}

module.exports = {
   getAllTasks
}