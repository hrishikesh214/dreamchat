const router = require("express").Router()
const { authenticator, handle, logger } = require("../utils")
const { user } = require("../controllers")

router.get("/", handle(user.getAllUsers))

router.post("/register", handle(user.register))

router.post("/", handle(user.login))

router.get(
	"/@me",
	authenticator,
	handle(async (req, res) => {
		res.send(await req.getUser())
	})
)

router.get(
	"/check",
	authenticator,
	handle(async (req, res) => {
		// logger(Object.keys(req.app.active))
		let cid = "C6292"
		req.app.active[req.user.id].emit(`chat_${cid}`, { ok: true })
		res.send({ ok: true })
	})
)

module.exports = router
