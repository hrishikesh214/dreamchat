import { Component } from "react"
import "./style.css"

class Footer extends Component {
	constructor(props) {
		super(props)
	}

	redirect_to(path) {
		window.location.href = path
	}

	render() {
		return (
			<>
				<footer className="footer">
					<div className="logo">Dreamchat</div>
					<div className="menu">
						<div
							className="option"
							onClick={() => this.redirect_to("/livedoc")}
						>
							LiveDoc
						</div>
						<div
							className="option"
							onClick={() => this.redirect_to("/about")}
						>
							About
						</div>
						<div
							className="option"
							onClick={() => this.redirect_to("/signup")}
						>
							Signup
						</div>
						<div
							className="option"
							onClick={() => this.redirect_to("/contact")}
						>
							Contact
						</div>
					</div>
				</footer>
			</>
		)
	}
}

export default Footer
