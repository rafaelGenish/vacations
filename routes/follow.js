const router = require('express').Router()
const { verifyAdmin, verifyUser } = require('../verify')
const {followVacation, unFollowVacation, getFollowVacation} = require('../controllers/followController')

router.post('/', verifyUser, followVacation)

router.delete('/:id?', verifyUser, unFollowVacation)

router.get('/', getFollowVacation)

module.exports = router