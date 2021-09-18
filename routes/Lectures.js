const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/all', async (req, res) => {
    // Retrive all data from lectures table
    const lectures = await db.Lecture.findAll()
    res.send(lectures)
})

module.exports = router