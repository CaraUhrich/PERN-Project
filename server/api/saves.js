const express = require('express')
const router = express.Router()

const { authRequired } = require('./utils')
const { getSavesbyUser, createSave, deleteSave } = require('../helperFns/saveshelper')

//GET saves by user
router.get('/:userId', authRequired, async (req, res, next) => {
    try {
        const saves = await getSavesbyUser(req.params.userId)
        
        res.send(saves)
    } catch (error) {
        next(error)
    }
})

//POST create save
router.post('/', authRequired, async (req, res, next) => {
    try {
        const { paintingId, userId } = req.body

        const save = await createSave({ paintingId, userId })
        
        res.send(save)
    } catch (error) {
        next(error)
    }
})

//DELETE remove save
router.delete('/:id', authRequired, async (req, res, next) => {
    try {
        const save = await deleteSave(req.params.id)

        res.send(save)
    } catch (error) {
        next(error)
    }
})

module.exports = router