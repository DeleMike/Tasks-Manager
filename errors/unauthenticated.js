const {
   StatusCodes
} = require('http-status-codes')

const CustomAPIError = require('./custom-error')
/**
 * Creates a unauthenticated request error class
 */
class UnAuthenticatedError extends CustomAPIError {
   constructor(message) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED
   }
}

module.exports = UnAuthenticatedError