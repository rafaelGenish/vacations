const { showAllVacations, showVacationById, createVacation, editThisVacation, deleteThisVacation, searchVacations,addFollow, lessFollow } = require('../handlers/vacationsHandler')
const getValueFromBody = require('../utils')


async function allVacations(req, res) {
    try {
        const vacations = await showAllVacations()
        res.json(vacations)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function vacationById(req, res) {
    try {
        const id = getValueFromBody(req.params, 'id')
        const vacation = await showVacationById(id)
        res.json(vacation)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function addVacation(req, res) {
    try {
        const description = getValueFromBody(req.body, 'description')
        const price = getValueFromBody(req.body, 'price')
        const picture = getValueFromBody(req.body, 'picture')
        const start = getValueFromBody(req.body, 'start')
        const end = getValueFromBody(req.body, 'end')

        if (!description && price && picture && start && end) {
            return res.status(401).json({ error: true, msg: "some info missing" })
        }
        await createVacation(description, price, picture, start, end)
        res.status(200).json({ error: false, msg: "vacation added successfully" })
        let vacations = await showAllVacations()
        res.json(vacations)
    } catch (error) {
        res.status(500).json(error)
        console.log("error")
    }
}

async function editVacation(req, res) {
    try {
        const description = getValueFromBody(req.body, 'description')
        const price = getValueFromBody(req.body, 'price')
        const picture = getValueFromBody(req.body, 'picture')
        const start = getValueFromBody(req.body, 'start')
        const end = getValueFromBody(req.body, 'end')
        const id = getValueFromBody(req.params, 'id')
        await edit(description, price, picture, start, end, id)
        let vacations = showAllVacations()
        res.json(vacations)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function deleteVacation (req, res) {
    try {
        const id = getValueFromBody(req.params, 'id')
        await deleteThisVacation(id)
        let vacations = await showAllVacations()
        res.json(vacations)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function following (req, res) {
    try {
        const id = getValueFromBody(req.params, 'id')
        await addFollow(id)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function unfollowing (req, res) {
    try {
        const id = getValueFromBody(req.params, 'id')
        const less = await lessFollow()
        res.json(less)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function searchForm (req, res) {
    try {
        const searchBox = getValueFromBody(req.body, 'searchBox')
        const search = await searchVacations(searchBox, searchBox, searchBox)
        res.json(search)
    } catch (error) {
        res.sendStatus(500)
    }
}


module.exports = { allVacations, vacationById, addVacation, editVacation, deleteVacation, searchForm, following, unfollowing }