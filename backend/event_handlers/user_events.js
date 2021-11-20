const { logger } = require("../utils")

module.exports = function (app, socket) {
	this.app = app
	this.socket = socket
	this.events = {
		user_status: check_user_status.bind(this),
	}
}

function check_user_status({ id: user_id }) {
	logger(this.app.active[user_id] !== undefined)
}
