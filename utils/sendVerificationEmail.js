const sendEmail = require('./sendEmail')

/**This servers to help send verification email to newly registered users */
const sendVerificationEmail = async ({
   name,
   email,
   verificationToken,
   origin
}) => {

   const verifyEmail = `${origin}/verify-user?verificationToken=${verificationToken}&email=${email}`
   const message = `<p>Please confirm your email by clicking the link: <a href="${verifyEmail}">Verify Email</a></p>`

   return sendEmail({
      to: email,
      subject: 'Email Confirmation',
      html: `<h4>Hello, ${name}</h4>
      ${message}
      `
   })
}

module.exports = sendVerificationEmail