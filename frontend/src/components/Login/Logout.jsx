import "./style.css"
import axios from "../common/axios"
import Loader from "../Loader"

export default function Logout({ ws }) {
	async function makeLogout() {
		try {
			let res = await axios({
				method: "post",
				url: "/user/logout",
			})
			ws.disconnect()
			localStorage.removeItem("DTOKEN")
			window.location.href = "/"
		} catch (err) {
			console.log(err)
		}
	}

	makeLogout()

	return <Loader />
}
