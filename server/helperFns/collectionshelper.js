const client = require('../db/client')

async function getAllCollections () {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM collections;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

async function getCollectionbyId (id) {
    try {
        const { 
            rows: [collection],
        } = await client.query(`
            SELECT *
            FROM collections
            WHERE collections.id = '${id}';
        `)
        return collection
    } catch (error) {
        throw error
    }
}

module.exports = { getAllCollections, getCollectionbyId }