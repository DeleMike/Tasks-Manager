const {
   StatusCodes
} = require('http-status-codes')
const CustomAPIError = require('../errors/custom-error')
/**
 * Creates a bad request error class
 */
class BadRequest extends CustomAPIError {
   constructor(message) {
      super(message)
      this.statusCode = StatusCodes.BAD_REQUEST
   }
}

module.exports = BadRequest