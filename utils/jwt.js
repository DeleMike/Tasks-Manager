const jwt = require('jsonwebtoken');

/**
 * creates a jwt 
 */
const createJWT = ({
  payload
}) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_LIFETIME,
  });
  return token;
};

/**
 * checks if the token gotten is valid
 */
const isTokenValid = (token) => jwt.verify(token, process.env.TOKEN_SECRET);

/**
 * Attach cookies to a logged in user
 */
const attachCookiesToResponse = ({
  res,
  user,
  refreshToken
}) => {
  const accessTokenJWT = createJWT({
    payload: {
      user
    }
  });
  const refreshTokenJWT = createJWT({
    payload: {
      user,
      refreshToken
    }
  });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000,
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};