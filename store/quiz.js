export const state = () => ({
	list: [],
	quiz: {},
})

export const mutations = {
	setList(state, quiz) {
		state.list = quiz
	},

	setQuiz(state, quiz) {
		state.quiz = quiz
	},

	reset(state) {
		state.list = [],
		state.quiz = {}
	}
}

export const actions = {
	async get({ commit }, contentId) {
		let quiz = await this.$axios.$get('/v2/quiz', {
			params: {
				content_id: contentId
			}
		})

		commit('setList', quiz.data)
	},

	async show({ commit }, id) {
		let quiz = await this.$axios.$get(`/v2/quiz/${id}`)

		commit('setQuiz', quiz.data)
	}
}
