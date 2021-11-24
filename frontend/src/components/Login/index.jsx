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
	const [err, setErr] = useState("")

	async function makeSignup() {
		var uname = document.getElementById("username").value
		var name = document.getElementById("name").value
		var pswd = document.getElementById("password").value
		var email = document.getElementById("email").value
		var hobbies = document.getElementById("hobbies").value
		var gender = document.getElementsByName("gender")[0].checked
			? "male"
			: "female"

		if (uname === "") {
			setErr(" Username required. ")
			return
		}
		if (pswd === "") {
			setErr(" Password required. ")
			return
		}
		try {
			let data = {
				username: uname,
				password: pswd,
				email,
				gender,
				hobbies,
				name,
			}
			let res = await axios({
				method: "post",
				url: "/user/register",
				data,
			})
			if (res.status === 200 && res.data.ok) {
				let last_path = localStorage.getItem("DLASTPAGE")
				window.location.href = last_path != null ? last_path : "/"
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="signup-form">
			<h1>Signup</h1>
			<div className="form-grid">
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input id="username" type="text" placeholder="Username" />
				</div>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input id="name" type="text" placeholder="Name" />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input id="email" type="email" placeholder="Email" />
				</div>
				<div className="form-group has-radio-group">
					<label htmlFor="gender">Gender</label>
					<div className="radio-group">
						<label htmlFor="gender-ma">Male</label>
						<input
							id="gender-ma"
							name="gender"
							type="radio"
							value="male"
						/>
					</div>
					<div className="radio-group">
						<label htmlFor="gender-fe">Female</label>
						<input
							id="gender-fe"
							type="radio"
							name="gender"
							value="female"
						/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="hobbies">Hobbies</label>
					<input
						id="hobbies"
						type="text"
						placeholder="chess, music,..."
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						placeholder="Password"
					/>
				</div>
			</div>
			<div className="form-group">
				<button className="btn-form-submit" onClick={makeSignup}>
					Signup
				</button>
			</div>
			<div className="form-group err-msg">{err}</div>
		</div>
	)
}
