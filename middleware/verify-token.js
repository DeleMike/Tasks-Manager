const {
   UnAuthenticatedError
} = require('../errors');
const { isTokenValid } = require('../utils');

/**
 * Verify user token to give access to private routes
 */
const authMiddleware = (req, res, next) => {
   const {refreshToken, accessToken } = req.signedCookies;

   // no token, user might not be authenticated
   if(!refreshToken) return res.status(401).send('Access Denied')

   try {
      const payload = isTokenValid(refreshToken);
      req.user = payload.user;
      return next();
   } catch (error) {
      throw new UnAuthenticatedError('Authentication Invalid');
   }

}

module.exports = authMiddleware