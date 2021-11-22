require("dotenv").config()
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
const jwt = require("jsonwebtoken")
const { configs, authenticator, handle, logger } = require("./utils")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.send({ Hello: "World" })
})

// ======== routes =================================================================

// === User ===
app.use("/user", require("./routes/users"))
app.post(
	"/user/logout",
	authenticator,
	handle(require("./controllers/users").logout(app))
)

// === 	Chat ===
app.use("/chat", require("./routes/chats"))

// ======== server =================================================================

server.listen(process.env.PORT, () => {
	console.log(
		`${chalk.greenBright("[server]")} listening on port ${chalk.green(
			process.env.PORT
		)}`
	)
})

// ======== socket.io =================================================================

const events = require("./event_handlers")
app.active = {}

// ======== socket.io authentication ==========================================================
io.use(function (socket, next) {
	if (socket?.handshake?.query?.token) {
		const [type, token] = socket.handshake.query.token.split(" ")
		if (type !== "Bearer") next(new Error("Authentication type error"))
		jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
			if (err) return next(new Error("Authentication error"))
			socket.decoded = decoded
			next()
		})
	} else {
		console.log("no token")
		next(new Error("Authentication error"))
	}
})

io.on("connection", (socket) => {
	app.event_types = {
		system: new events.system_events(app, socket),
		user: new events.user_events(app, socket),
		chat: new events.chat_events(app, socket),
		livedoc: new events.livedoc_events(app, socket),
	}
	for (var ev in app.event_types) {
		let { events } = app.event_types[ev]
		for (var event in events) {
			socket.on(event, events[event])
		}
	}
	app.active[socket.decoded.id] = socket
	configs.log &&
		console.log(
			`${chalk.yellow("[socket]")} ${chalk.green(
				socket.decoded.id
			)} connected!`
		)
})

io.on("disconnection", (e) => {
	configs.log && console.log(`Socket disconnected: ${e.id}`)
})

// setInterval(() => io.emit("core", { gg: true }, "ok"), 2000)
