const {
   StatusCodes
} = require('http-status-codes')

const CustomAPIError = require('../errors/custom-error')
/**
 * Creates a unauthenticated request error class
 */
 class UnauthenticatedError extends CustomAPIError {
   constructor(message) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED
   }
}

module.exports = UnauthenticatedError