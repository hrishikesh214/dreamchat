const { db, logger } = require("../utils")

const { chat: Chat, user: User, message: Message } = db

exports.getAllChats = async (req, res) => {
	const chats = await Chat.findAll()
	res.json(chats)
}
