import Confirm from '@/components/alert/Confirm.vue'

const confirm = {
	title: '',
	message: '',
	type: '',

	async toSubmit() {
		$nuxt.$bvModal.show('confirmToSubmit')
	},

	toDelete() {
		$nuxt.$bvModal.show('confirmToDelete')
	}
}

export default ({ app }, inject) => {
	inject('confirm', confirm)
}
