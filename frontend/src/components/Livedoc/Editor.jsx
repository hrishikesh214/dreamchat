import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["image", "blockquote", "code-block"],
	["clean"],
]

export default function TextEditor({ ws }) {
	const [socket, setSocket] = useState(ws)
	const [quill, setQuill] = useState()
	let { id: documentId } = useParams()

	useEffect(() => {
		if (socket == null || quill == null) return

		socket.once("load_document", (document) => {
			quill.setContents(document)
			quill.enable()
		})

		socket.emit("get_document", documentId)
	}, [socket, quill, documentId])

	useEffect(() => {
		if (socket == null || quill == null) return

		const interval = setInterval(() => {
			socket.emit("save_document", quill.getContents())
		}, SAVE_INTERVAL_MS)
		return () => {
			clearInterval(interval)
		}
	}, [socket, quill])

	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta) => {
			quill.updateContents(delta)
		}
		socket.on("receive_changes", handler)

		return () => {
			socket.off("receive_changes", handler)
		}
	}, [socket, quill])

	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta, oldDelta, source) => {
			if (source !== "user") return
			socket.emit("send_changes", delta)
		}
		quill.on("text_change", handler)

		return () => {
			quill.off("text_change", handler)
		}
	}, [socket, quill])

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return

		wrapper.innerHTML = ""
		const editor = document.createElement("div")
		wrapper.append(editor)
		const q = new Quill(editor, {
			theme: "snow",
			modules: { toolbar: TOOLBAR_OPTIONS },
		})
		q.disable()
		q.setText("Loading...")
		setQuill(q)
	}, [])
	return <div className="container" ref={wrapperRef}></div>
}
