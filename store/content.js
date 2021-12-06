export const state = () => ({
    list: [],
	item: {}
})

export const mutations = {
    setList(state, contents) {
        state.list = contents
    },

	setItem(state, item) {
		state.item = item
	}
}

export const actions = {
	get({ commit }) {
		this.$axios.get('/my/content').then(({ data }) => {
			commit('setList', data.data)
		})
	},

	show({ commit }, id) {
		this.$axios.get(`/my/content/${id}`).then(({ data }) => {
			commit('setItem', data.data)
		})
	}
}
