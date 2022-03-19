module.exports = {
   host: process.env.HOST_EMAIL,
   port: 587,
   auth: {
      user: process.env.HOST_AUTH_USER, // generated ethereal user
      pass: process.env.HOST_AUTH_PASSWORD, // generated ethereal password
   },
}