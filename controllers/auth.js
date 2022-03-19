const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const {
   StatusCodes
} = require('http-status-codes')

const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const {
   BadRequest
} = require('../errors')
// const sendEmail = require('../utils/sendEmail')
const {
   sendVerificationEmail
} = require('../utils')
const {
   registerValidation,
   loginValidation
} = require('../configs/validation')
const UnAuthenticatedError = require('../errors/unauthenticated')


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

   const verificationToken = crypto.randomBytes(40).toString('hex')

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
      verificationToken: verificationToken

   });

   //save a user to db
   await user.save();

   // send email
   const origin = 'http://localhost:5000'
   await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin: origin
   })

   res.status(StatusCodes.CREATED).send({
      msg: 'Success! Please check your email to verify your email',
      user: user._id,
   });
})


/**
 * Verify user email address
 */
const verifyUserEmail = async (req, res) => {
   const {
      verificationToken,
      email
   } = req.body

   console.log(req.body);

   const user = await User.findOne({
      email
   })
   // if there is no user
   if (!user) throw new UnAuthenticatedError("Verification failed.")

   // verify the token
   if (user.verificationToken !== verificationToken) throw new UnAuthenticatedError("Verification failed.")

   // if all is well
   user.isVerified = true
   user.verified = Date.now()
   user.verificationToken = '' // clear verify token

   user.save()

   res.status(StatusCodes.OK).json({
      msg: 'Email verified'
   })

}


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
   if (!user) throw new UnAuthenticatedError("Email does not exists.")

   // check if password is correct
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if (!validPass) throw new UnAuthenticatedError("Password does not macth")

   // check if user is verified
   const isVerified = user.isVerified
   if (!isVerified) throw new UnAuthenticatedError("Please verify your email address.")

   res.status(StatusCodes.OK).send({
      msg: 'user signed in',
      user: user._id,
      isVerified: user.isVerified
   })
})


/**
 * Tries to logout the user
 */
const logoutUser = asyncWrapper(async (req, res) => {})

module.exports = {
   registerUser,
   loginUser,
   verifyUserEmail,
   logoutUser
}