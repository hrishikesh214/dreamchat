const { logger } = require("../utils")

module.exports = function (app, socket) {
	this.app = app
	this.socket = socket
	this.events = {
		chat_ping: chat_service_ping.bind(this),
	}
}

function chat_service_ping() {
	logger("pong!")
}
