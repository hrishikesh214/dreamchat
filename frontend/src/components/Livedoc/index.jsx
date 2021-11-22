import {
	useParams,
	useRouteMatch,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"
import { Component, useSatate, useEffect } from "react"
import Navbar from "../Navbar"
import Footer from "../Footer"
import "./style.css"
import TextEditor from "./Editor"
import { v4 as uuidV4 } from "uuid"

export default function Livedoc(props) {
	let { url, path } = useRouteMatch()

	return (
		<>
			<Navbar title="LiveDoc" opts={["signup", "login"]} />
			<Switch>
				<Route exact path={url}>
					<Redirect to={`${url}/${uuidV4()}`} />
				</Route>
				<Route path={`${url}/:id`}>
					<main>
						<TextEditor ws={props.ws} />
					</main>
				</Route>
			</Switch>

			<Footer />
		</>
	)
}
