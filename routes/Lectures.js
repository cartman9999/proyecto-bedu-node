const express = require('express')
const router = express.Router()
const db = require('../models')
const Joi = require('joi')

// Get all lectures
router.get('/all', async (req, res) => {
    // Retrive all data from lectures table
    const lectures = await db.Lecture.findAll()
    res.status(200).send(lectures)
})

// Get an specific lecture
router.get('/:id', async (req, res) => {
    // Validate id
    const { error } = requiredIdValidation(req.params)
    if (error) return res.status(400).send(error.details[0].message)

    // Retrive specific id from lectures table
    try {
        const lecture = await db.Lecture.findByPk(parseInt(req.params.id))
        res.status(200).send(lecture)
    } catch (error) {
        res.status(404).send([])
    }

})

// Create a new lecture
router.post('/', async (req, res) => {
    // Validate data before inserting
    const { error } = createLectureValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Create new lecture
    try {
        const lecture = await db.Lecture.create({
            name: req.body.name,
            url: req.body.url
        })

        res.status(201).send(lecture)
    } catch (error) {
        res.status(500).send('Hubo un error al insertar el registro')
    }
})

// Update a lecture
router.put('/', async (req, res) => {
    // Validate id
    const { error } = updateLectureValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        // Find lecture
        let lecture = await db.Lecture.findByPk(parseInt(req.body.id))
        if (!lecture) return res.status(400).send("Este registro no existe.")

        // Update lecture
        await db.Lecture.update(
            {
                name: req.body.name,
                url: req.body.url,
                read: toBoolean(req.body.read)
            }, 
            { where: { id: req.body.id }}
        )

        // Refresh data
        lecture = await db.Lecture.findByPk(parseInt(req.body.id))

        res.status(200).send({
            message: "Registro actualizado",
            data: lecture
        })
    } catch (error) {
        res.status(500).send("Ocurrió un error al intentar actualizar el registro.")
    }
})

// Delete a lecture
router.delete('/:id', async (req, res) => {
    // Validate id
    const { error } = requiredIdValidation(req.params)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        // Find lecture
        const lecture = await db.Lecture.findByPk(parseInt(req.params.id))
        if (!lecture) return res.status(400).send("Este registro no existe.")

        // Delete lecture
        await db.Lecture.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send({
            message: "Registro eliminado",
            data: lecture
        })
    } catch (error) {
        res.status(500).send("Ocurrió un error al intentar eliminar el registro.")
    }
})

// |--------------------|
// |--Validation Rules--|
// |--------------------|
/**
 * Check if id has been sent
 * 
 * @param data 
 * @returns object 
 */
function requiredIdValidation(data) {
    const schema = Joi.object({
        id: Joi.number().integer().required()
    })

    return schema.validate(data)
}

/**
 * Rules for creating a new lecture
 *
 * @param data
 * @returns object
 */
function createLectureValidation(data) {
    // Create schema for validation
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        url: Joi.string().min(12).required()
    })

    // Validate data
    return schema.validate(data)
}

/**
 * Rules for updating a lecture
 *
 * @param data
 * @returns object
 */
function updateLectureValidation(data) {
    // Create schema for validation
    const schema = Joi.object({
        id: Joi.number().integer().required(),
        name: Joi.string().min(3).required(),
        url: Joi.string().min(12).required(),
        read: Joi.valid('1', '0')
    })

    // Validate data
    return schema.validate(data)
}

// |--------------------|
// |-- Convert Value ---|
// |--------------------|
function toBoolean(data) {
    return (data === '1') ? true : false
}


module.exports = router