const express = require('express')
const router = express.Router()
const { getAllArtists, getArtistbyId } = require('../helperFns/artistshelper')

router.get('/', async (req, res, next) => {
    try {
        const artists = await getAllArtists()
        res.send(artists)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const artist = await getArtistbyId(req.params.id)
        res.send(artist)
    } catch (error) {
        next(error)
    }
})

module.exports = router