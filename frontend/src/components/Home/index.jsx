import { useParams } from "react-router-dom"
import { Component, useSatate, useEffect } from "react"
import Navbar from "../Navbar"
import Footer from "../Footer"
import "./style.css"

class Home extends Component {
	constructor(props) {
		super(props)
		this.ws = props.ws
	}
	componentDidMount() {}

	render() {
		return (
			<>
				<Navbar opts={["signup", "login", "livedoc"]} />
				<main>
					<section className="s1">
						<div className="big1">
							<h1>Just Go </h1>

							<h1>Dreaming</h1>
						</div>
						<div className="livedoc-ad">
							<h1>LiveDoc</h1>
							<span>
								Edit document in real-time <br />
								with your friend
							</span>
							<span>No Signup</span>
						</div>
					</section>
					<section className="s2">
						<div className="random-chat-ad">
							<h1>
								Have <span className="highlight-big">Fun</span>
								<br />
								With randoms
							</h1>
						</div>
						<div className="ad-screen">
							<div className="ad-img">
								<img src="" alt="SS" />
							</div>
						</div>
					</section>
				</main>
				<Footer />
			</>
		)
	}
}

export default Home
