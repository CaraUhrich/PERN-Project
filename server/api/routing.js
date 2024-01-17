const express = require('express')
const router = express.Router()

router.get('/health', (req, res, next) => {
    res.send('OK')
})

router.use('/paintings', require('./paintings.js'))

module.exports = router