const chalk = require("chalk")

exports.catchError = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next)
		} catch (e) {
			console.error(`${chalk.red("[error handler]")} ${e}`)
			if (typeof e == "string") {
				e = {
					code: 400,
					msg: e,
				}
			} else if (typeof e == "number") {
				e = {
					code: e,
					msg: handleCode(e),
				}
			}
			res.status(e.code ?? 400).send({
				ok: false,
				error: {
					code: e.code ?? 400,
					msg: e.msg ?? handleCode(e.code ?? 400),
				},
			})
		}
	}
}

// =================== KNOWN ERROR ========================
function handleCode(e) {
	var err = "Unknown Error"
	switch (e) {
		case 400:
			err = "Bad Request"
			break
		case 401:
			err = "Unauthorized"
			break
		case 403:
			err = "Forbidden"
			break
		case 404:
			err = "Not Found"
			break
		case 500:
			err = "Internal Server Error"
			break
		case 501:
			err = "Not Implemented"
			break
		case 502:
			err = "Bad Gateway"
			break
		case 503:
			err = "Service Unavailable"
			break
		case 504:
			err = "Gateway Timeout"
			break

		default:
			err = "Unknown Error"
	}
	return err
}
