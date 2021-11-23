const { logger, db } = require("../utils")

const Livedoc = db.livedoc

const defaultValue = {}

module.exports = function (app, socket) {
	this.app = app
	this.socket = socket
	this.documentId = null
	this.user_id = socket.decoded.id
	this.events = {
		get_document: get_document.bind(this),
		send_changes: send_changes.bind(this),
		save_document: save_document.bind(this),
		change_document_name: change_document_name.bind(this),
		get_livedocs: get_livedocs.bind(this),
	}
}

async function get_document(documentId) {
	if (documentId == null) return
	this.documentId = documentId
	const document = await findOrCreateDocument(documentId, this.user_id)
	this.socket.join(documentId)
	this.socket.emit("load_document", document)
}

function send_changes(changes) {
	if (this.documentId == null) return
	this.socket.broadcast.to(this.documentId).emit("recieve_changes", changes)
}

async function save_document(content) {
	if (this.documentId == null) return
	let document = await Livedoc.findOne({ where: { id: this.documentId } })
	document.setContent(content)
	await document.save()
}

async function change_document_name(documentId, newName) {
	if (documentId == null) return
	let document = await Livedoc.findOne({ where: { id: documentId } })
	document.name = newName
	await document.save()
	this.socket.broadcast.to(documentId).emit("update_document_name", newName)
}

async function get_livedocs() {
	let livedocs = await Livedoc.findAll({
		where: { user_id: this.user_id },
	})
	this.socket.emit("load_livedocs", livedocs)
}

async function findOrCreateDocument(id, user_id) {
	if (id == null) return
	const document = await Livedoc.findOne({ where: { id } })
	if (document) return document
	let new_doc = await Livedoc.create({ id, user_id: user_id })
	new_doc.setContent(defaultValue)
	await new_doc.save()
	return new_doc
}
