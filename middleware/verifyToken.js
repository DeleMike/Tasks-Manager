const jwt = require('jsonwebtoken')

/**
 * Verify user token to give access to private routes
 */
const authMiddleware = (req, res, next) => {
   const token = req.header('auth-token')
   // no token, user might not be authenticated
   if(!token) return res.status(401).send('Access Denied')

   try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      next()
   } catch (error) {
      // bad request, token might be tampered
      return res.status(400).send('Invalid token')
   }

}

module.exports = authMiddleware