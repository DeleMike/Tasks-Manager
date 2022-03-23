const sendVerificationEmail = require('./sendVerificationEmail');
const sendResetPasswordEmail = require('./sendResetPasswordEmail');
const createTokenUser = require('./createTokenUser');
const {
   createJWT,
   isTokenValid,
   attachCookiesToResponse
} = require('./jwt')

module.exports = {
   sendVerificationEmail,
   sendResetPasswordEmail,
   createTokenUser,
   createJWT,
   isTokenValid,
   attachCookiesToResponse,
}