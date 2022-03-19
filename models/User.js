const mongoose = require('mongoose');

/**
 * Formats the date string
 * @param {date} date The date inputted into the system
 * @param {format} format The format to return
 * @returns formatted String
 */
function formatDate(date, format) {
   const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yy: date.getFullYear().toString().slice(-2),
      yyyy: date.getFullYear()
   }

   return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}

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
   // dob: {
   //    type: Date,
   //    // new Date() takes a format of mm-dd-yyyy
   //    default: formatDate(new Date(), 'dd/mm/yyyy'),
   // },
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
   verified: Date
})

module.exports = mongoose.model('Users', userSchema)