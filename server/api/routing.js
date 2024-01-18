const express = require('express')
const router = express.Router()

router.get('/health', (req, res, next) => {
    res.send('OK')
})

router.use('/paintings', require('./paintings.js'))
router.use('/artists', require('./artists.js'))
router.use('/collections', require('./collections.js'))
router.use('/users', require('./users.js'))

module.exports = router