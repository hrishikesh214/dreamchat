import { useState } from "react"
import "./style.css"
import axios from "../common/axios"

export default function Login() {
	const [err, setErr] = useState("")

	async function makeLogin() {
		var uname = document.getElementById("username").value
		var pswd = document.getElementById("password").value
		if (uname === "") {
			setErr(" Username required. ")
			return
		}
		if (pswd === "") {
			setErr(" Password required. ")
			return
		}
		try {
			let res = await axios({
				method: "post",
				url: "/user",
				data: { username: uname, password: pswd },
			})
			if (res.status === 200 && res.data.ok) {
				let last_path = localStorage.getItem("DLASTPAGE")
				window.location.href = last_path != null ? last_path : "/"
				localStorage.setItem("DTOKEN", `Bearer ${res.data.token}`)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="login-form">
			<h1>Login</h1>
			<div className="form-group">
				<label htmlFor="username">Username</label>
				<input id="username" type="text" placeholder="Username" />
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input id="password" type="password" placeholder="Password" />
			</div>

			<div className="form-group">
				<button className="btn-form-submit" onClick={makeLogin}>
					Login
				</button>
			</div>
			<div className="form-group err-msg">{err}</div>
		</div>
	)
}

export function Signup() {
	return "signup"
}
