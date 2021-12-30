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
	async get({ commit }, parentId = null) {
		let contents = await this.$axios.$get('/v2/content', {
			params: {
				parent_id: parentId
			}
		})

		commit('setList', contents.data)
	},

	async show({ commit }, id) {
		let content = await this.$axios.$get(`/my/content/${id}`)

		commit('setItem', content.data)
	}
}
