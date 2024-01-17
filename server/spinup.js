const express = require('express')
const app = express()
const PORT = 8080

const morgan = require('morgan')
app.use(morgan('dev'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const { COOKIE_SECRET } = require('./secrets')
const cookieParser = require('cookie-parser')
app.use(cookieParser(COOKIE_SECRET))

const client = require('./db/client')
client.connect()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', require('./api/routing'))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})