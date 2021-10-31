import { useParams } from "react-router-dom"
import { useSatate, useEffect } from "react"

const Home = ({ ws }) => {
	const { username } = useParams()

	useEffect(() => {
		ws.send({ ok: true, message: username })
	}, [])

	return (
		<div>
			<h1>Hello {username}</h1>
		</div>
	)
}

export default Home
