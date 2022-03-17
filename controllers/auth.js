const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const {
   BadRequest
} = require('../errors')

const {
   registerValidation,
   loginValidation
} = require('../configs/validation')
/**
 * Tries to register a user
 */
const registerUser = asyncWrapper(async (req, res, next) => {
   const {
      error
   } = registerValidation(req.body)

   if (error) throw new BadRequest(error.details[0].message)

   // check if user is already in db
   const emailExists = await User.findOne({
      email: req.body.email
   })
   if (emailExists) throw new BadRequest("Email already exists.")
   //using async-express-error
   // if (emailExists) throw Error('Email already exists.')

   // next encrypt passowrd
   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(req.body.password, salt)

   // create new user
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      phone_num: req.body.phone_num,
      dob: req.body.dob,
      team_name: req.body.team_name,
      is_team_lead: req.body.is_team_lead,
      github_link: req.body.github_link,
   });

   //save a user to db
   await user.save();
   const token = jwt.sign({
      _id: user._id
   }, process.env.TOKEN_SECRET)
   res.status(StatusCodes.CREATED).send({
      user: user._id
   });
})

/**
 * Tries to login a user
 */
const loginUser = asyncWrapper(async (req, res, next) => {
   const {
      error
   } = loginValidation(req.body)
   if (error) throw new BadRequest(error.details[0].message)

   // check if user email is not in db
   const user = await User.findOne({
      email: req.body.email
   })
   if (!user) throw new BadRequest("Email already exists.", 400)

   // check if password is correct
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if (!validPass) throw new BadRequest("Password does not macth", 400)

   // create and assign token
   const token = jwt.sign({
      _id: user._id
   }, process.env.TOKEN_SECRET)
   res.header('auth-token', token).json({
      msg: 'user signed in',
      token
   })
})

/**
 * Tries to logout the user
 */
const logoutUser = asyncWrapper(async (req, res) => {})

module.exports = {
   registerUser,
   loginUser,
   logoutUser
}