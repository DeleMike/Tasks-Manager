//testing configurations.
// module.exports = {
//    host: process.env.HOST_EMAIL,
//    port: 587,
//    auth: {
//       user: process.env.HOST_AUTH_USER, // generated ethereal user
//       pass: process.env.HOST_AUTH_PASSWORD, // generated ethereal password
//    },
// }

// production configuration
module.exports = {
   service: 'gmail',
   auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
   }
};