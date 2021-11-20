const chalk = require("chalk")
const jwt = require("jsonwebtoken")
const { catchError: handle } = require("../error_handlers")
const { user } = require("../models")

module.exports = (req, res, next) => {
	handle((req, res, next) => {
		const { authorization } = req.headers
		if (!authorization) throw 403
		const [type, token] = authorization.split(" ")
		if (type !== "Bearer") throw 403
		try {
			const { id } = jwt.verify(
				token,
				process.env.JWT_SECRET ?? "wdjdhdwdg921e1g"
			)
			req.user = { id }
			req.getUser = async () => {
				return await user.findOne({ where: { id: req.user.id } })
			}
			next()
		} catch (e) {
			console.log(
				`${chalk.red(
					"[authenticator]"
				)} JWT not verified! \n[error]: \n${e}`
			)
			throw 400
		}
	})(req, res, next)
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU0NDgyNyIsImlhdCI6MTYzNzMwMzU4Mn0.kNRNdh30FKqYV8bKy5uKxiQd4m25DYCPk6pqkmeevtY
