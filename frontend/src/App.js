import io from "socket.io-client"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import Home from "./components/Home"

const ws = io.connect("http://localhost:5000")
ws.on("message", (m) => console.log(m))
ws.on("connection", (m) => console.log("connected to server"))

const App = () => {
	return (
		<>
			<Router>
				<Route path="/:username">
					<Home ws={ws} />
				</Route>
			</Router>
		</>
	)
}

export default App
