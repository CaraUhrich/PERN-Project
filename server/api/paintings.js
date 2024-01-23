const express = require('express')
const router = express.Router()
const { getAllPaintings, getPaintingbyId, getPaintingsbyArtist, getPaintingsbyCollection } = require('../helperFns/paintingshelper')
const { getCommentsbyPainting } = require('../helperFns/commentshelper')
const { getSavesbyPainting } = require('../helperFns/saveshelper')

//get all
router.get('/', async (req, res, next) => {
    try {
        const paintings = await getAllPaintings()
        res.send(paintings)
    } catch (error) {
        next(error)
    }
})

//get by id
router.get('/:id', async (req, res, next) => {
    try {
        const painting = await getPaintingbyId(req.params.id)
        painting.comments = await getCommentsbyPainting(req.params.id)
        painting.saves = await getSavesbyPainting(req.params.id)

        res.send(painting)
    } catch (error) {
        next(error)
    }
})

//get by Artist
router.get('/artist/:id', async (req, res, next) => {
    try {
        const paintings = await getPaintingsbyArtist(req.params.id)
        res.send(paintings)
    } catch (error) {
        next(error)
    }
})

//get by Collection
router.get('/collection/:id', async (req, res, next) => {
    try {
        const paintings = await getPaintingsbyCollection(req.params.id)
        res.send(paintings)
    } catch (error) {
        next(error)
    }
})

module.exports = router