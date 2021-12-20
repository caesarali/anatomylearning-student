export default function ({ $axios, app, redirect }) {
	$axios.onRequest(config => {
		let server = localStorage.getItem('auth.base-url')
		config.baseURL = server
	})

	$axios.onError(({ response }) => {
		if (response.status != 422) {
			app.$toast.error(response.data.message ?? 'Woops, something wrong...', `Error (${response.status})`)
			return response
		}
	})
}
