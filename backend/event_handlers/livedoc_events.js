const { logger, db } = require("../utils")

const Livedoc = db.livedoc

const defaultValue = ""

module.exports = function (app, socket) {
	this.app = app
	this.socket = socket
	this.events = {
		get_document: get_document.bind(this),
	}
}

async function get_document(documentId) {
	const document = await findOrCreateDocument(documentId)
	this.socket.join(documentId)
	this.socket.emit("load_document", document.content)
}

async function findOrCreateDocument(id) {
	if (id == null) return
	const document = await Livedoc.findOne({ where: { id } })
	if (document) return document
	let new_doc = await Livedoc.create({ id, content: defaultValue })
	await new_doc.save()
	return new_doc
}
