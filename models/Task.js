const mongoose = require('mongoose');

/**
 * Defines how a particular task event will be represented
 */
const taskEventSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Must provide task event name'],
      trim: true
   },
   details: {
      type: String,
      required: [true, 'Must provide task event details'],
      trim: true
   },
   start: {
      type: Date,
      default: Date.now,
   },
   due: {
      type: Date,
      default: Date.now,
   },
   assigned_to: {
      type: [String],
      required: true
   },
   is_due: {
      type: Boolean,
      default: false
   },
})


/**
 * Defines how user model is represented in the system
 */
const taskSchema = mongoose.Schema({
   _id: {
      type: Number
   },
   title: {
      type: String,
      required: [true, 'Must provide task title'],
      trim: true,
   },
   details: {
      type: String,
      required: [true, 'Must provide task description'],
      trim: true,
   },
   start: {
      type: Date,
      default: Date.now,
   },
   due: {
      type: Date,
      default: Date.now,
   },
   creator: {
      type: String,
      required: [true, 'Must provide creator\'s name'],
      trim: true,
   },
   is_overdue: {
      type: Boolean,
      default: true,
   },
   task_events: {
      type: [taskEventSchema],

   },
   status: {
      type: String,
      required: [true, 'Must provide task status']
   }
})

module.exports = mongoose.model('Tasks', taskSchema)