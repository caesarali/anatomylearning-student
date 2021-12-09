import Error from "~/libs/error";
const errors = new Error

export default function ({ app }, inject) {
	inject('errors', errors)
}
