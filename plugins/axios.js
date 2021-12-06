export default function ({ $axios, redirect }) {
	$axios.onRequest(config => {
		let server = localStorage.getItem('auth.base-url')
		config.baseURL = server
	})
}
