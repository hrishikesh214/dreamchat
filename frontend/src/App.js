import io from "socket.io-client"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useEffect } from "react"

import "./universal.css"
import { api } from "./components/configs"

// ======== importing components ========
import Home from "./components/Home"
import Livedoc from "./components/Livedoc"
import Loader from "./components/Loader"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login, { Signup } from "./components/Login"
import Logout from "./components/Login/Logout"

// ========== make socket.io connection ==========
var token = ""
token = localStorage.getItem("DTOKEN")

const ws = io.connect(api.base, {
	query: { token },
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
			<Navbar />
			<Router>
				<Switch>
					<Route exact path="/">
						<Home ws={ws} />
					</Route>
					<Route path="/livedoc">
						<Livedoc ws={ws} />
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/logout">
						<Logout ws={ws} />
					</Route>
					<Route exact path="/about">
						<Loader />
					</Route>
					<Route exact path="/contact">
						<Loader />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</>
	)
}

export default App
