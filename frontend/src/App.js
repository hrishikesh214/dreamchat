import io from "socket.io-client"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./universal.css"
import { useState, useEffect } from "react"

import Home from "./components/Home"
import Livedoc from "./components/Livedoc"
import Loader from "./components/Loader"
import Navbar from "./components/Navbar"

import { api } from "./components/configs"

// ========== make connection ==========
var token = ""
token = localStorage.getItem("DTOKEN")

const ws = io.connect(api.base, {
	query: {
		token,
		token1: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU0NDgyNyIsImlhdCI6MTYzNzMyMzg5OH0.nmoA7Kuxkdou-CqCW-rPUQOX_n0DkwstAokko1GnUM4",
		token1: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU4NDQ3NiIsImlhdCI6MTYzNzMzMjk5OX0.7xjyvabyCpNUZbVmkIm_nykfH8lj-F-FCXrz55NYmP0",
		token2: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU0NTQ3NSIsImlhdCI6MTYzNzQxNTMwN30.jS9MTWv2VJMjxICEoLU2IMKtvNVD0o2TSVi8iHlRUFc",
	},
})

ws.once("message", (m) => console.log(m))
ws.once("connection", (m) => console.log("connected to server"))
ws.once("core", () => console.log("[core]"))
ws.once("set_guest", (token) => {
	localStorage.setItem("DTOKEN", `Guest ${token}`)
})
ws.once("set_token", (token) => {
	localStorage.setItem("DTOKEN", `Bearer ${token}`)
})

// ========== start rendering ==========

const App = () => {
	var start, end

	useEffect(() => {
		console.log("[App] use effect")
	}, [])

	function calc_latency() {
		start = Date.now()
		ws.emit("ping")
		ws.once("pong", () => {
			end = Date.now()
			!isNaN(start) && console.log(`[latency] `, end - start)
		})
	}

	return (
		<>
			<Router>
				<Switch>
					<Route exact path="/">
						<Home ws={ws} />
					</Route>
					<Route path="/livedoc">
						<Livedoc ws={ws} />
					</Route>
					<Route exact path="/signup">
						<Navbar title="Signup" opts={["livedoc", "login"]} />
						<Loader />
					</Route>
					<Route exact path="/login">
						<Navbar title="Login" opts={["livedoc", "signup"]} />
						<Loader />
					</Route>
					<Route exact path="/about">
						<Navbar
							title="About"
							opts={["livedoc", "login", "signup"]}
						/>
					</Route>
					<Route exact path="/contact">
						<Navbar
							title="Contact"
							opts={["livedoc", "login", "signup"]}
						/>
						<Loader />
					</Route>
				</Switch>

				{/* <button onClick={() => ws.emit("show_all", { ok: true })}>
					test
				</button>
				<button
					onClick={() => ws.emit("user_status", { id: "U84476" })}
				>
					check status
				</button>
				<button onClick={() => ws.send("ok")}>Send</button>
				<button onClick={calc_latency}>ping</button> */}
			</Router>
		</>
	)
}

export default App
