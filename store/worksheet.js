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
	get({ commit }, contentId) {
		this.$axios.get('/v2/worksheet', {
			params: {
				content_id: contentId
			}
		})
		.then(({ data }) => {
			commit('setList', data.data)
		})
	},

	show({ commit }, id) {
		this.$axios.get(`/v2/worksheet/${id}`).then(({ data }) => {
			commit('setWorksheet', data.data)
		})
	}
}
