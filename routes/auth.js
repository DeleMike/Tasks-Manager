const res = require('express/lib/response')
const router = require('express').Router()

// register route
router.post('/register', (req, res) => {
   res.send('Register route')
});

module.exports = router;