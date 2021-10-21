// import io from "socket.io"
import { useParams } from "react-router-dom"
import { useSatate, useEffect } from "react"

const Home = () => {
	const { username } = useParams()
	console.log(username)

	useEffect(() => {
		make_connection()
	})

	const make_connection = async () => {
		console.log(io.connect("http://localhost:5000"))
	}

	return (
		<div>
			<h1>Hello {username}</h1>
		</div>
	)
}

export default Home
