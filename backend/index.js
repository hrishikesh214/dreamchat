const http = require("http")
const chalk = require("chalk")
const express = require("express")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
})
const cors = require("cors")
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.send({ Hello: "World" })
})

// ======== routes =================================================================
app.use("/user", require("./routes/users"))

// ======== server =================================================================

server.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${chalk.green(process.env.PORT)}`)
})

// ======== socket.io =================================================================

io.on("connection", (socket) => {
	console.log("connected!")
	socket.send({ ok: true, message: "connected!" })

	socket.on("message", (m) => console.log(m))
})

io.on("disconnection", (e) => console.log(e))
