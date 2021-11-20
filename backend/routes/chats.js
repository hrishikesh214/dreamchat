const { chat } = require("../controllers")
const router = require("express").Router()
const { authenticator, handle, logger } = require("../utils")

router.get("/", handle(chat.getAllChats))

module.exports = router
