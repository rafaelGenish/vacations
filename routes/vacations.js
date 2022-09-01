const router = require('express').Router()
const { verifyAdmin, verifyUser } = require('../verify')
const { allVacations, vacationById, addVacation, editVacation, deleteVacation, searchForm, following, unfollowing } = require('../controllers/vacationsController')
const Query = require('../db')
const {  } = require('../handlers/vacationsHandler')

router.get('/', allVacations)

router.get('/:id', vacationById)

router.post('/add', verifyAdmin, addVacation)

router.put('/:id', verifyAdmin, editVacation)

router.delete('/:id', verifyAdmin, deleteVacation)

router.post('/search', searchForm)

router.post('/following/:id', verifyUser, following)

router.post('/unfollowing', verifyUser, unfollowing)

module.exports = router