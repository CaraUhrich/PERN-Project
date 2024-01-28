const client = require('../db/client')
const util = require('./util')

async function getCommentsbyPainting (paintingId) {
    try {
        const { rows } = await client.query(`
            SELECT comments.*, users.name as "userName"
            FROM comments
            INNER JOIN users ON comments."userId" = users.id
            WHERE "paintingId" =${paintingId};
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function createComment ({ title, content, lastUpdated, edited, paintingId, userId }) {
    try {
        const {
            rows: [comment],
        } = await client.query(`
            INSERT INTO comments(title, content, "lastUpdated", edited, "paintingId", "userId")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [title, content, lastUpdated, edited, paintingId, userId]
        )
        return comment
    } catch (error) {
        throw error
    }
}

async function updateComment(id, fields) {
    try {
        console.log(fields)
        const toUpdate = {}
        for (let column in fields) {
            if (fields[column] !== undefined) {
                toUpdate[column] = fields[column]
            }
        }

        let comment = {}

        if (util.dbFields(toUpdate).insert.length > 0) {
            const { rows } = await client.query(`
                UPDATE comments
                SET ${util.dbFields(toUpdate).insert}
                WHERE id =${id}
                RETURNING *;
            `, Object.values(toUpdate))

            comment = rows[0]
        }

        return comment
    } catch (error) {
        throw error
    }
    
    
}

async function deleteComment (id) {
    try {
        const { 
            rows: [comment]
        } = await client.query(`
            DELETE FROM comments
            WHERE id = ${id}
            RETURNING *;
        `)
        return comment
    } catch (error) {
        throw error
    }
}

module.exports = { getCommentsbyPainting, createComment, updateComment, deleteComment }