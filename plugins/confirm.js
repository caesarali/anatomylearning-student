const confirm = {
	toSubmit() {
		$nuxt.$bvModal.show('confirmToSubmit')
	},

	toDelete() {
		$nuxt.$bvModal.show('confirmToDelete')
	}
}

export default ({ app }, inject) => {
	inject('confirm', confirm)
}
