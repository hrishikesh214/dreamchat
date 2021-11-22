import { useParams } from "react-router-dom"

import { Component, useSatate, useEffect } from "react"

import "./style.css"

class Navbar extends Component {
	constructor(props) {
		super(props)
		this.opts = {
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
	componentDidMount() {}

	render() {
		var defaultOpts = ["livedoc", "login"]
		let opts = this.props.opts ?? defaultOpts

		return (
			<>
				<div className="navbar">
					<div className="navbar-brand">
						<a href="/">Dreamchat</a>
					</div>
					<div className="title">{this.props.title ?? ""}</div>
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
