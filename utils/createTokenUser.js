/**
 * Creates a token once user is logged in
 * @param {user} user  The authenticated & authorized user
 * @returns temporary user object
 */
const createTokenUser = (user) => {
   return {
     name: user.name,
     userId: user._id,
     team: user.team_name
   };
 };
 
module.exports = createTokenUser;