const toast = {
	success(message) {
		$nuxt.$bvToast.toast(message, {
			title: 'Success',
		})
	},

	error(message, title = 'Error') {
		$nuxt.$bvToast.toast(message, {
			title: title,
			variant: 'danger'
		})
	}
}

export default ({ app }, inject) => {
	inject('toast', toast)
}
