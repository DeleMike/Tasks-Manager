const {
   CustomAPIError
} = require('../errors')
const {
   StatusCodes
} = require('http-status-codes')
/**
 * Custom error handler
 */
const errorHandler = (err, req, res, next) => {
   if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({
         msg: err.message
      })
   }
   res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong, try again later.')
}

module.exports = errorHandler