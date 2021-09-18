// Require Express and Express Router
const express = require('express')
const router = express.Router()

// Require additional Router
const userRoutes = require('./Users')
const lectureRoutes = require('./Lectures')

// Define routes
router.use('/users', userRoutes)
router.use('/lectures', lectureRoutes)

module.exports = router