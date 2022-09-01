const { isFollowingVacation, addFollowVacation, getUsersFollowingVacation,stopFollowing } = require( '../handlers/followHandler')
const {addFollow, lessFollow} = require('../handlers/vacationsHandler')
const getValueFromBody = require( '../utils')


async function followVacation(req, res) {
    try {
        const userId = getValueFromBody(req.body, 'userId')
        const vacId = getValueFromBody(req.body, 'vacId')

        const isFollowing = await isFollowingVacation(userId, vacId)
        if (isFollowing) {
            return res.status(401).json({ error: true, msg: "you follow this vacation" })
        }

        await addFollowVacation(userId, vacId)
        await addFollow(vacId)
        const followed = await getUsersFollowingVacation(userId)
        res.json(followed)
    } catch (error) {
        res.error(error)
    }

}

async function unFollowVacation(req, res) {
    try {
        const userId = getValueFromBody(req.query, 'userId')
        const vacId = getValueFromBody(req.params, 'id')

        const isFollowing = await isFollowingVacation(userId, vacId)
        if (!isFollowing) {
            return res.status(401).json({ error: true, msg: "you are not following this vacation" })
        }

        await stopFollowing(userId, vacId)
        await lessFollow(vacId)
        const followed = await getUsersFollowingVacation(userId)
        res.json(followed)
    } catch (error) {
        console.log(error)
        res.error(error)
    }

}
async function getFollowVacation(req, res) {
    try {
        const userId = getValueFromBody(req.query, 'userId')

        const followed = await getUsersFollowingVacation(userId)
        res.json(followed)
    } catch (error) {
        console.log(error)
        res.json(error)
    }

}


module.exports = {followVacation, unFollowVacation, getFollowVacation}