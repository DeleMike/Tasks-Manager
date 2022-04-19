// VALIDATION
const Joi = require('@hapi/joi')

/**
 * Used to validate user registration data
 * @param {data} data register form data
 * @returns validation object
 */
const registerValidation = (data) => {
   const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
      phone_num: Joi.array().required(),
      dob: Joi.string(),
      team_name: Joi.string().required(),
      is_team_lead: Joi.boolean(),
      github_link: Joi.string().required(),
   })

   // validate data before making a user
   return schema.validate(data)
}

/**
 * Used to validate user login data
 * @param {data} data register form data
 * @returns validation object
 */
const loginValidation = (data) => {
   const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
   })

   // validate data before making a user
   return schema.validate(data)
}

const createTaskValidation = (data) => {
   const schema = Joi.object({
      _id: Joi.number(),
      title: Joi.string().required(),
      details: Joi.string().required(),
      start: Joi.date(),
      due: Joi.date(),
      creator: Joi.string().required(),
      is_overdue: Joi.boolean(),
      task_events: Joi.array(),
      status: Joi.string().required()
   })

   return schema.validate(data)
}

module.exports = {
   registerValidation,
   loginValidation,
   createTaskValidation
}