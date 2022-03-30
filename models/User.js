const mongoose = require('mongoose');

/**
 * Defines how user model is represented in the system
 */
const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Must provide your name'],
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'Must provide your email'],
      trim: true,
   },
   password: {
      type: String,
      required: [true, 'Must provide your password'],
   },
   phone_num: {
      type: [String],
      required: ['true', 'Must provide a phone number'],
      trim: true,
   },
   dob: {
      type: String,
      required: ['true', 'Must provide your birth date'],
      trim: true,

   },
   team_name: {
      type: String,
      required: ['true', 'Must provide the main team you belong to'],
      trim: true,
   },
   is_team_lead: {
      type: Boolean,
      default: false,
   },
   github_link: {
      type: String,
      trim: true,
      default: 'None'
   },
   verificationToken: String,
   isVerified: {
      type: Boolean,
      default: false,
   },
   verified: Date,
   passwordToken: {
      type: String,
   },
   passwordTokenExpirationDate: Date,

})

module.exports = mongoose.model('Users', userSchema)