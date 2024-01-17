const client = require('../db/client')

async function getAllArtists () {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM artists;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function getArtistbyId (id) {
    try {
        const { 
            rows: [artist],
        } = await client.query(`
            SELECT *
            FROM artists
            WHERE artists.id = '${id}';
        `)
        return artist
    } catch (error) {
        throw error
    }
}

module.exports = { getAllArtists, getArtistbyId }