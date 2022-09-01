const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
    if (req.header("Authorization")) {
        jwt.verify(req.header("Authorization"), 'UsErS', (err, user) => {
            if (err) {
                res.status(403).json({ error: true, msg: "token is not valid" })
            } else {
                if (user.role === 'user') {
                    req.user = user
                    next()
                } else {
                    res.status(403).json({ error: true, msg: "you are an admin! you can't follow vacations" }) 
                }
            }
        })
    } else {
        res.status(401).json({ error: true, msg: "token expected" })
    }
}

const verifyAdmin = (req, res, next) => {
    if (req.header("Authorization")) {
        jwt.verify(req.header("Authorization"), 'UsErS', (err, user) => {
            if (err) {
                res.status(403).json({ error: true, msg: "token is not valid" })
            } else {
                if (user.role === "admin") {
                    req.user = user
                    next()
                } else {
                    res.status(403).json({ error: true, msg: "you don't have permission" })
                }
            }
        })
    } else {
        res.status(401).json({ error: true, msg: "token expected" })
    }
}


module.exports = {
    verifyUser,
    verifyAdmin
}