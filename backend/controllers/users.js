const { db, logger } = require("../utils")
const jwt = require("jsonwebtoken")
const User = db.user

exports.getAllUsers = async (req, res) => {
	const users = await User.findAll()
	res.json(users)
}

exports.register = async (req, res) => {
	const { username, email, password, name } = req.body

	// check for username exists
	var _u = await User.findOne({ where: { username } })
	if (_u) throw "Username exists"

	// generate ID
	id_ok = false
	while (!id_ok) {
		var id = `U${Math.floor(Math.random() * 100000 + 1)}`
		_u = await User.findOne({ where: { id } })
		if (!_u) id_ok = true
	}

	const user = await User.create({
		id,
		username,
		email,
		name,
	})
	user.setPassword(password)
	if (!(await user.save())) throw "Registration failed!"
	res.send({
		ok: true,
		username,
	})
}

exports.login = async (req, res) => {
	const { username, password } = req.body

	const user = await User.findOne({ where: { username } })
	if (!user) throw "Username not found"
	if (!user.checkPassword(password)) throw "Password incorrect"

	const token = jwt.sign(
		{
			id: user.id,
		},
		process.env.JWT_SECRET ?? "wdjdhdwdg921e1g"
	)
	res.send({
		ok: true,
		token,
	})
}

exports.logout = (app) => {
	return async (req, res, next) => {
		// logger("logout", req)
		delete app.active[req.user.id]
		res.send({ ok: true })
	}
}
