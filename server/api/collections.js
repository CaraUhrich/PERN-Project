const express = require('express')
const router = express.Router()
const { getAllCollections, getCollectionbyId } = require('../helperFns/collectionshelper')

router.get('/', async (req, res, next) => {
    try {
        const collections = await getAllCollections()
        res.send(collections)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const collection = await getCollectionbyId(req.params.id)
        res.send(collection)
    } catch (error) {
        next(error)
    }
})

module.exports = router