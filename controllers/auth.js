const bcrypt = require('bcryptjs')

const User = require('../models/User')
const {
   registerValidation,
   loginValidation
} = require('../configs/validation')
/**
 * Tries to register a user
 */
const registerUser = async (req, res) => {
   const {
      error
   } = registerValidation(req.body)

   if (error) return res.status(400).send(error.details[0].message)

   // check if user is already in db
   const emailExists = await User.findOne({
      email: req.body.email
   })
   if (emailExists) return res.status(400).send("Email already exists.")

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
   try {
      await user.save()
      res.status(200).send({
         user: user._id
      });
   } catch (error) {
      res.status(400).send(err)
   }
}

/**
 * Tries to login a user
 */
const loginUser = async (req, res) => {
   const {
      error
   } = loginValidation(req.body)
   if (error) return res.status(400).send(error.details[0].message)

   // check if user email is not in db
   const user = await User.findOne({
      email: req.body.email
   })
   if (!user) return res.status(400).send('Email does not exist.')

   // check if password is correct
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if (!validPass) return res.status(400).send('password does not match.')

   res.status(200).send('Logged in')
}
module.exports = {
   registerUser,
   loginUser
}