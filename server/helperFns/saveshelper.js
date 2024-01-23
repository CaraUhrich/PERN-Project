const client = require('../db/client')

async function getSavesbyUser (userId) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM saves
            WHERE "userId" =${userId};
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function getSavesbyPainting (paintingId) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM saves
            WHERE "paintingId" =${paintingId};
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function createSave ({ paintingId, userId }) {
    try {
        const {
            rows: [save],
        } = await client.query(`
            INSERT INTO saves("paintingId", "userId")
            VALUES($1, $2)
            RETURNING *;
        `, [paintingId, userId]
        )
        return save
    } catch (error) {
        throw error
    }
}

async function deleteSave (id) {
    try {
        const { rows } = await client.query(`
            DELETE FROM saves
            WHERE id = ${id}
            RETURNING *;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = { getSavesbyUser, getSavesbyPainting, createSave, deleteSave }