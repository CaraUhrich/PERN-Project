const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

const { getSavesbyUser, createSave, deleteSave } = require('../helperFns/saveshelper')

//GET saves by user
router.get('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1]
        const user = jwt.verify(token, JWT_SECRET)

        const saves = await getSavesbyUser(user.id)
        
        res.send(saves)
    } catch (error) {
        next(error)
    }
})

//POST create save
router.post('/', async (req, res, next) => {
    try {
        const { paintingId, userId } = req.body

        const save = await createSave({ paintingId, userId })
        
        res.send(save)
    } catch (error) {
        next(error)
    }
})

//DELETE remove save
router.delete('/:id', async (req, res, next) => {
    try {
        const save = await deleteSave(req.params.id)

        res.send(save)
    } catch (error) {
        next(error)
    }
})

module.exports = router