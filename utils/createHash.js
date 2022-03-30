const crypto = require('crypto');

/**
 * Hash the token string
 */
const hashString = (string) => crypto.createHash('md5').update(string).digest('hex')

module.exports = hashString