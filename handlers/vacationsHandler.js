const Query = require('../db')

async function showAllVacations() {
    return await Query(`SELECT * FROM vacations`)
}

async function showVacationById(id) {
    return await Query(`SELECT * FROM vacations WHERE id = ?`, [id])
}

async function createVacation(description, price, picture, start, end) {
    let q = `INSERT INTO vacations (description, price, picture, date_start, date_end)
        VALUES(?, ?, ?, ?, ?)`
    return await Query(q, [description, price, picture, start, end])
}

async function editThisVacation(description, price, picture, start, end, id) {
    let q = `UPDATE vacations SET description = ?, price = ?, picture = ?, date_start = ?, date_end = ?
        WHERE id = ?`
    return await Query(q, [description, price, picture, start, end, id])
}

async function addFollow (id) {
    return await Query(`UPDATE vacations SET following = following +1 WHERE id = ?`, [id])
    
}

async function lessFollow (id) {
    return await Query(`UPDATE vacations SET following = following -1 WHERE id = ?`, [id])
}

async function deleteThisVacation (id) {
    let q = `DELETE FROM vacations WHERE id = ?`
        return await Query(q, [id])
}

async function searchVacations (searchBox, searchBox, searchBox) {
    let q = `SELECT * FROM vacations WHERE description LIKE ? OR price LIKE ? OR date_start LIKE ? OR date_end LIKE ?`
    return await Query(q, [`%${searchBox}%`, `%${searchBox}%`, `%${searchBox}%`, `%${searchBox}%`])
}

module.exports = { showAllVacations, showVacationById, createVacation, editThisVacation, deleteThisVacation, searchVacations, addFollow, lessFollow }