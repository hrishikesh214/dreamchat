const router = require("express").Router()
const { authenticator, handle } = require("../utils")
const { user } = require("../controllers")

router.get("/", handle(user.getAllUsers))

router.post("/register", handle(user.register))

router.post("/", handle(user.login))

router.get(
	"/check",
	authenticator,
	handle(async (req, res, next) => {
		res.send({
			user: req.user,
		})
	})
)

module.exports = router
