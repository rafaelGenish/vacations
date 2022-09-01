const Query = require('../db')


async function isUserExist(username) {
    const q = `SELECT * FROM users WHERE username = ?`
    const res = await Query(q, [username])
    return res.length
}

async function addUser(name, lname, username, hash) {
    let q = `INSERT INTO users (name, last_name, username, password) VALUES(?, ?, ?, ?)`
    return await Query(q, [name, lname, username, hash])
}

async function getThisUser(username) {
    return await Query(`SELECT * FROM users WHERE username = ? `, [username])

}

async function getAllUsers() {
    return await Query(`SELECT * FROM users`)

}


module.exports = { isUserExist, addUser, getThisUser, getAllUsers }