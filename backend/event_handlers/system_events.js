const { configs, logger } = require("../utils")

module.exports = function (app, socket) {
	this.app = app
	this.socket = socket
	this.user = { id: socket.decoded.id }
	this.events = {
		ping: ping.bind(this),
		show_all: show_all.bind(this),
		message: message.bind(this),
	}
}

function message(...m) {
	logger(`[${this.user.id}]`, ...m)
}

function ping() {
	logger(`[${this.user.id}] pinged!`)
	this.socket.emit("pong")
}

function show_all() {
	console.log(this.app)
	logger(`see bellow \n `, Object.keys(this.app.active))
}
