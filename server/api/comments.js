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
router.post('/', authRequired, async (req, res, next) => {
    try {
        const { title, content, lastUpdated, edited, paintingId, userId } = req.body

        const comment = await createComment({ title, content, lastUpdated, edited, paintingId, userId })

        res.send(comment)
    } catch (error) {
        next(error)
    }
})

//PUT update comment
router.put('/:id', authRequired, async (req, res, next) => {
    try {
        delete req.body.token

        const comment = await updateComment(req.params.id, req.body)

        res.send(comment)
    } catch (error) {
        next(error)
    }
})

//DELETE delete comment
router.delete('/:id', authRequired, async (req, res, next) => {
    try {
        const comment = await deleteComment(req.params.id)

        res.send(comment)
    } catch (error) {
        next(error)
    }
})

module.exports = router