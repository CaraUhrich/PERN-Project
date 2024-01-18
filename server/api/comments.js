const express = require('express')
const router = express.Router()

const { authRequired } = require('./utils')
const { getCommentsbyPainting, createComment, updateComment, deleteComment } = require('../helperFns/commentshelper')

//GET comments by painting
router.get('/:paintingId', async (req, res, next) => {
    try {
        const comments = await getCommentsbyPainting(req.params.paintingId)

        res.send(comments)
    } catch (error) {
        next(error)
    }
})

//POST create comment
router.post('/', async (req, res, next) => {
    try {
        const { title, content, lastUpdated, edited, paintingId, userId } = req.body

        const comment = await createComment({ title, content, lastUpdated, edited, paintingId, userId })

        res.send(comment)
    } catch (error) {
        next(error)
    }
})

//PUT update comment

//DELETE delete comment

module.exports = router