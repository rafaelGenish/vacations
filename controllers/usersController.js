const { isUserExist, addUser, getThisUser, getAllUsers } = require('../handlers/usersHandler')
const getValueFromBody = require('../utils')
const {genSaltSync, hashSync, compareSync} = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function createUser(req, res) {
    try {
        const name = getValueFromBody(req.body, 'name')
        const lname = getValueFromBody(req.body, 'lname')
        const username = getValueFromBody(req.body, 'username')
        const password = getValueFromBody(req.body, 'password')
        if (name && lname && password && username) {
        const user = await isUserExist(username)
        if (user) {
            return res.status(401).json({ error: true, msg: "The user already exist" })
        }

        const salt = genSaltSync(10)
        const hash = hashSync(password, salt)
        await addUser(name, lname, username, hash)
        res.status(200).json({ error: false, msg: "User added successfully", hash })
    } else {
        res.status(401).json({ error: true, msg: "missing some info" })
    }
    } catch (error) {
        res.json({error})
    }
}


async function logIn(req, res) {
    try {
        const username = getValueFromBody(req.body, 'username')
        const password = getValueFromBody(req.body, 'password')
        if (username && password) {
        const user = await getThisUser(username)
        if (!user.length) {
            return res.status(401).json({ error: true, msg: "username dno't exist in the system" })
        }
            if (compareSync(password, user[0].password)) {
                let token = jwt.sign({id: user[0].id, name: user[0].name, role: user[0].role}, 'UsErS', {
                    expiresIn: '45m'
                })
                res.status(200).json({ error: false, msg: "login successed", token})
            } else {
                res.status(401).json({ error: true, msg: "username or password are incorrect" })
            }
        } else {
            return res.status(401).json({ error: true, msg: "missing some info" })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getAll (req, res) {
    try {
        const users = getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { createUser, logIn, getAll }