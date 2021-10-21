const http = require('http')
const chalk = require('chalk')
const express = require('express')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
require('dotenv').config()

app.use(express.json())

app.get('/', (req, res) => {
    res.send({ok:true})
})

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${chalk.bgGreen(process.env.PORT)}`)
})