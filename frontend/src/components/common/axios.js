import axios from "axios"
import { api } from "../configs"

const dtoken = localStorage.getItem("DTOKEN")

const instance = axios.create({
	baseURL: api.base,
	headers: {
		Authorization: dtoken ?? null,
	},
})

export default instance
