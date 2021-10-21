import io from "socket.io"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useParams,
} from "react-router-dom"

import Home from "./components/Home"

const App = () => {
	return (
		<>
			<Router>
				<Route path="/:username">
					<Home />
				</Route>
			</Router>
		</>
	)
}

export default App
