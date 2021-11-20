import { useParams } from "react-router-dom"
import { Component, useSatate, useEffect } from "react"

// const Home = ({ ws }) => {
// 	const { username } = useParams()
// let cid = "C6292"

// 	useEffect(() => {
// 		console.log("[Home] use effect")
// ws.on(`chat_${cid}`, (e) => console.log(`[chat_${cid}]`, e))
// 	}, [])
// 	console.log("home called")

// 	return (
// 		<div>
// 			<h1>Hello {username}</h1>
// 		</div>
// 	)
// }

class Home extends Component {
	constructor(props) {
		super(props)
		this.ws = props.ws
	}
	componentDidMount() {
		console.log("[Home] componentDidMount")
		let cid = "C6292"
		this.ws.on(`chat_${cid}`, (e) => console.log(`[chat_${cid}]`, e))
	}

	render() {
		return (
			<div>
				<h1>Hello </h1>
			</div>
		)
	}
}

export default Home
