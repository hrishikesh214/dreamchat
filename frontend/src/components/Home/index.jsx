import { useParams } from "react-router-dom"
import { useSatate, useEffect } from "react"

const Home = ({ ws }) => {
	const { username } = useParams()
	let cid = "C6292"

	useEffect(() => {
		console.log("[Home] use effect")
	}, [])
	console.log("home called")

	ws.on(`chat_${cid}`, (e) => console.log(`[chat_${cid}]`, e))

	return (
		<div>
			<h1>Hello {username}</h1>
		</div>
	)
}

export default Home
