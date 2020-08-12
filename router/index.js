const express = require('express')
const router = express.Router()
const auth = require('./routes/auth')
const admin = require('./routes/admin')
const blog = require('./routes/blog')

router.use('/auth', auth)
router.use('/admin', admin)
router.use('/blog', blog)

module.exports = router