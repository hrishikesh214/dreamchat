import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useParams } from "react-router-dom"
import Loader from "../Loader"

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
	const [livedoc, setLD] = useState()
	const [socket, setSocket] = useState(ws)
	const [quill, setQuill] = useState()
	let { id: documentId } = useParams()

	const [toLoad, setToLoad] = useState(true)
	const [_rf, set_rf] = useState(0)
	const update_page = () => set_rf(_rf + 1)

	useEffect(() => {
		if (socket == null || quill == null) return
		socket.once("load_document", (ld) => {
			setLD(ld)
			setToLoad(false)
			quill.setContents(JSON.parse(ld.content))
			quill.enable()
		})

		socket.once("update_document_name", (newName) => {
			setLD({ ...livedoc, name: newName })
			console.log("update_document_name", newName)
			update_page()
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
		socket.on("recieve_changes", handler)

		return () => {
			socket.off("recieve_changes", handler)
		}
	}, [socket, quill])

	useEffect(() => {
		if (socket == null || quill == null) return

		const handler = (delta, oldDelta, source) => {
			if (source !== "user") return
			socket.emit("send_changes", delta)
		}
		quill.on("text-change", handler)

		return () => {
			quill.off("text-change", handler)
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

	const changeDocumentName = (documentName) => {
		socket.emit("change_document_name", documentId, documentName)
	}

	return (
		<>
			<div className="livedoc__desc">
				{toLoad ? (
					<Loader />
				) : (
					<input
						type="text"
						onChange={(e) => changeDocumentName(e.target.value)}
						defaultValue={livedoc.name}
					/>
				)}
			</div>
			<div className="livedoc__date">{new Date().toDateString()}</div>
			<div className="livedoc__editor">
				<div className="container" ref={wrapperRef}></div>
			</div>
			<div className="livedoc__tags"></div>
			<div className="livedoc__controls">
				<button className="btn-stop">Stop</button>
			</div>
		</>
	)
}
