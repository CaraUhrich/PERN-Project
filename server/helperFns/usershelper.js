const client = require('../db/client')
const util = require('./util')

async function createUser ({ name, username, password }) {
    try {
        const {
            rows: [user],
        } = await client.query (`
            INSERT INTO users(name, username, password)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [name, username, password]
        )
        return user
    } catch (error) {
        throw error
    }
}

// async function updateToken (token, id) {
//     try {
//         const { 
//             rows: [user]
//          } = await client.query(`
//             UPDATE users
//             SET token = ${token}
//             WHERE id = ${id}
//             RETURNING *;
//         `)
//         return user
//     } catch (error) {
//         throw error
//     }
// }

async function getUserByUsername (username) {
    try {
        const {
            rows: [user],
        } = await client.query(`
            SELECT *
            FROM users
            WHERE users.username = '${username}';
        `)
        return user
    } catch (error) {
        throw error
    }
}

module.exports = { createUser, getUserByUsername }