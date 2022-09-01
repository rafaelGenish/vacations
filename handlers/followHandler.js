const Query = require('../db')


async function isFollowingVacation(userId, vacationId) {
    const q = `SELECT * FROM followed_vacations WHERE user_id = ? AND vacation_id = ?`
    const res = await Query(q, [userId, vacationId])
    return res.length
}

async function addFollowVacation(userId, vacationId) {
    let q = `INSERT INTO followed_vacations (user_id, vacation_id) VALUES(?, ?)`
    return await Query(q, [userId, vacationId])
}

async function stopFollowing(userId, vacationId) {
    const q = `DELETE FROM followed_vacations WHERE user_id = ? AND vacation_id = ?`
    return await Query(q, [userId, vacationId])
}

async function getUsersFollowingVacation(userId) {
    return await Query(`SELECT vacations.*
            FROM followed_vacations
            INNER JOIN vacations ON followed_vacations.vacation_id = vacations.id
            WHERE user_id = ?`, [userId])
}

module.exports = { isFollowingVacation, addFollowVacation, getUsersFollowingVacation ,stopFollowing}