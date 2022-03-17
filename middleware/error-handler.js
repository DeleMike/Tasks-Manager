/**
 * Custom error handler
 */
const errorHandler = (err, req, res, next) => {
   return res.status(500).json({err:'Something went wrong, try again later.'})
}

module.exports = errorHandler