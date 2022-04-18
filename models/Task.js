const {
   required
} = require('@hapi/joi/lib/base');
const mongoose = require('mongoose');

/**
 * Defines how user model is represented in the system
 */
const taskSchema = mongoose.Schema({
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
   task_id: {
      //type: mongoose.Types.ObjectId,
      type: Number,
      //ref: 'Tasks Events',
      required: true,
   },
})

module.exports = mongoose.model('Tasks', taskSchema)