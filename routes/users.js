const router = require('express').Router()
const { createUser, logIn, getAll } = require('../controllers/usersController')

router.post('/signup', createUser)

router.post('/signin', logIn)

router.get('/all', getAll)

module.exports = router;