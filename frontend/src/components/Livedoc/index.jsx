import { useRouteMatch, Switch, Route, Redirect } from "react-router-dom"
import { useState, useEffect } from "react"
import Footer from "../Footer"
import "./style.css"
import TextEditor from "./Editor"
import { v4 as uuidV4 } from "uuid"
import Loader from "../Loader"

export default function Livedoc({ ws }) {
	let { url } = useRouteMatch()
	if (url.endsWith("/")) url = url.slice(0, -1)
	const [lds, setLds] = useState([])
	const [toLoad, setToLoad] = useState(true)

	useEffect(() => {
		ws.once("load_livedocs", (livedocs) => {
			setLds(livedocs)
			setToLoad(false)
		})

		ws.emit("get_livedocs")
	}, [])

	return (
		<>
			<Switch>
				<Route exact path={`${url}/new`}>
					<Redirect to={`${url}/${uuidV4()}`} />
				</Route>
				<Route exact path={url}>
					{toLoad ? (
						<Loader />
					) : (
						<main className="livedoc-home">
							<h1>LiveDoc</h1>
							<div className="doc-list">
								<div className="livedoc-item add">
									<a href={`${url}/new`}>Create new</a>
								</div>
								{lds.map((ld) => (
									<div className="livedoc-item">
										<a href={`${url}/${ld.id}`}>
											{ld.name}
										</a>
									</div>
								))}
							</div>
						</main>
					)}
				</Route>
				<Route path={`${url}/:id`}>
					<main className="livedoc">
						<TextEditor ws={ws} />
					</main>
				</Route>
			</Switch>

			<Footer />
		</>
	)
}
