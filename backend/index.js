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
const db = require("./models")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.send({ ok: true })
})
app.get("/add/:pass", async (req, res) => {
	let u = await db.user.build({ id: "U12321", username: "hrishikesh" })
	let { pass } = req.params
	u.setPassword(pass)
	await u.save()
	// console.log(u)
	res.send({ ok: true, correct: u.checkPassword(pass) })
})

server.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${chalk.bgGreen(process.env.PORT)}`)
})

io.on("connection", (socket) => {
	console.log("connected!")
	socket.send({ ok: true, message: "connected!" })

	socket.on("message", (m) => console.log(m))
})

io.on("disconnection", (e) => console.log(e))
