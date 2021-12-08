export default function ({ $auth }) {
	const baseURL = $auth.$storage.getUniversal('base-url')
	if (baseURL == null || baseURL == '') {
		alert('Please choose server before...')
	}
}
