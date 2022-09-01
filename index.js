const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))
app.use('/follow', require('./routes/follow'))

app.get('/', (req, res) => {
    res.send('vacations server. welcome!!')
})

app.listen(2000, () => console.log('run and up on port 2000'))