import io from "socket.io-client"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import Home from "./components/Home"

const ws = io.connect("http://localhost:5000", {
	query: {
		token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU0NDgyNyIsImlhdCI6MTYzNzMyMzg5OH0.nmoA7Kuxkdou-CqCW-rPUQOX_n0DkwstAokko1GnUM4",
		token1: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU4NDQ3NiIsImlhdCI6MTYzNzMzMjk5OX0.7xjyvabyCpNUZbVmkIm_nykfH8lj-F-FCXrz55NYmP0",
	},
})

ws.on("message", (m) => console.log(m))
ws.on("connection", (m) => console.log("connected to server"))
ws.on("core", () => console.log("[core]"))

const App = () => {
	var start, end

	useEffect(() => {
		console.log("[App] use effect")
	}, [])
	ws.on("pong", () => {
		end = Date.now()
		!isNaN(start) && console.log(`[latency] `, end - start)
	})

	function calc_latency() {
		// var start, end
		start = Date.now()
		ws.emit("ping")
	}

	return (
		<>
			<Router>
				<Route path="/">
					<Home ws={ws} />
				</Route>
				<button onClick={() => ws.emit("show_all", { ok: true })}>
					test
				</button>
				<button
					onClick={() => ws.emit("user_status", { id: "U84476" })}
				>
					check status
				</button>
				<button onClick={() => ws.send("ok")}>Send</button>
				<button onClick={calc_latency}>ping</button>
			</Router>
		</>
	)
}

export default App
