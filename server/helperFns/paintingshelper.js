const client = require('../db/client')

async function getAllPaintings () {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM paintings;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function getPaintingbyId (id) {
    try {
        const { 
            rows: [painting],
        } = await client.query(`
            SELECT *
            FROM paintings
            WHERE paintings.id = '${id}';
        `)
        return painting
    } catch (error) {
        throw error
    }
}

async function getPaintingsbyArtist (artistId) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM paintings
            WHERE "artistId" =${artistId};
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function getPaintingsbyCollection (collectionId) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM paintings
            WHERE "collectionId" =${collectionId};
        `)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = { getAllPaintings, getPaintingbyId, getPaintingsbyArtist, getPaintingsbyCollection }