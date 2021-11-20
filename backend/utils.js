const configs = require("./configs")

exports.configs = configs

exports.authenticator = require("./middlewares/authenticator")

exports.handle = require("./error_handlers").catchError

exports.db = require("./models")

function logger(...val) {
	configs.log && console.log(`[${logger.caller.name}]`, ...val)
}

exports.logger = logger
