// Additional Requirements
const env = require('dotenv')
const routes = require('./routes/index')

// Require Express
const express = require('express')
const app = express()

// Require DB
const db = require('./models')

// Get data from .env
env.config()

// Configurations
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Define app listening port
const PORT = process.env.PORT || 3000

// Get DB
db.sequelize.sync().then(() => {
    app.listen(PORT , () => {
        console.log(`Listening on port: ${PORT}`)
        console.log(`http://localhost:${PORT}`)
    })
})


// Get routes
app.use('/api', routes)

app.get('/', (req, res) => {
    res.send("Bienvenido")
})

// Launch server
// app.listen(PORT , () => {
//     console.log(`Listening on port: ${PORT}`)
//     console.log(`http://localhost:${PORT}`)
// })