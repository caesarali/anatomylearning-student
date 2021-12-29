export const state = () => ({
	list: [],
	worksheet: {},
})

export const mutations = {
	setList(state, worksheets) {
		state.list = worksheets
	},

	setWorksheet(state, worksheet) {
		state.worksheet = worksheet
	},

	reset(state) {
		state.list = [],
		state.worksheet = {}
	}
}

export const actions = {
	async get({ commit }, contentId) {
		let worksheets = await this.$axios.$get('/v2/worksheet', {
			params: {
				content_id: contentId
			}
		})

		commit('setList', worksheets.data)
	},

	async show({ commit }, id) {
		let worksheet = await this.$axios.$get(`/v2/worksheet/${id}`)

		commit('setWorksheet', worksheet.data)
	}
}
