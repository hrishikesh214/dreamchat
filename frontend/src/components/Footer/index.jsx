import { Component } from "react"
import "./style.css"

class Footer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<footer className="footer">
					<div className="logo">Dreamchat</div>
					<div className="menu">
						<div className="option">LiveDoc</div>
						<div className="option">About</div>
						<div className="option">Signup</div>
						<div className="option">Contact</div>
					</div>
				</footer>
			</>
		)
	}
}

export default Footer
