// Require Express and Express Router
const express = require('express')
const router = express.Router()

// Require additional Router
const userRoutes = require('./Users')

// Define routes
router.use('/users', userRoutes)

module.exports = router