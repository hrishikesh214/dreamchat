import { Component } from "react"

import "./style.css"

const _paths = {
	"": { title: "", options: ["livedoc", "signup", "login"] },
	signup: { title: "Signup", options: ["livedoc", "home", "login"] },
	login: { title: "Login", options: ["livedoc", "home", "signup"] },
	chat: { title: "Chat", options: [] },
	logout: { title: "Logging off", options: [] },
	livedoc: { title: "LiveDoc", options: ["home"] },
	about: { title: "About", options: ["home"] },
	contact: { title: "Contact", options: ["home"] },
}

function get_path_route() {
	return window.location.href.split("/")[3]
}

function generate_config() {
	var config = { title: "", options: [] }
	var url = get_path_route()
	config = _paths[url]
	return config
}

function normalize_opts(options) {
	var token_str = localStorage.getItem("DTOKEN")
	if (token_str !== null && token_str.indexOf("Bearer") !== -1) {
		//add logout
		if (options.indexOf("logout") === -1) {
			options.push("logout")
		}
		//remove login and signup
		if (options.indexOf("login") !== -1) {
			options.splice(options.indexOf("login"), 1)
		}
		if (options.indexOf("signup") !== -1) {
			options.splice(options.indexOf("signup"), 1)
		}
	} else {
		// add login
		if (options.indexOf("login") === -1 && get_path_route() !== "login") {
			options.push("login")
		}
		//add signup
		if (options.indexOf("signup") === -1 && get_path_route() !== "signup") {
			options.push("signup")
		}

		// remove logout
		if (options.indexOf("logout") !== -1) {
			options.splice(options.indexOf("logout"), 1)
		}
	}
	return options
}

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.opts = {
			home: { name: "Home", path: "/" },
			signup: {
				name: "Signup",
				path: "/signup",
			},
			login: {
				name: "Login",
				path: "/login",
			},
			livedoc: {
				name: "LiveDoc",
				path: "/livedoc",
			},
			settings: {
				name: "Settings",
				path: "/settings",
			},
			logout: {
				name: "Logout",
				path: "/logout",
			},
		}
	}

	render() {
		var { title, options: opts } = generate_config()
		opts = normalize_opts(opts)

		return (
			<>
				<div className="navbar">
					<div className="navbar-brand">
						<a href="/">Dreamchat</a>
					</div>
					<div className="title">{title}</div>
					<div className="opts">
						{opts.map((opt) => (
							<div className="opt">
								<a href={this.opts[opt].path}>
									{this.opts[opt].name}
								</a>
							</div>
						))}
					</div>
				</div>
			</>
		)
	}
}

export default Navbar
