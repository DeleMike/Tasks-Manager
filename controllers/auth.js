const User = require('../models/User')

/**
 * Tries to register a user
 */
const registerUser = async (req, res) => {
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone_num: req.body.phone_num,
      dob: req.body.dob,
      team_name: req.body.team_name,
      is_team_lead: req.body.is_team_lead,
      github_link: req.body.github_link,
   });

   //save a user to db
   try {
      const savedUser = await user.save()
      res.send(savedUser);
   } catch (error) {
      res.status(400).send(err)
   }
}

module.exports = {
   registerUser
}