<template>
	<div class="container">
		<NuxtLink :to="`/content/${quiz.content_id}#quiz`" class="text-decoration-none text-success mb-3 d-block">
			<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
			</svg>
			{{ quiz.name }}
		</NuxtLink>

		<ul class="list-group list-group-flush">
			<li class="list-group-item" v-for="(item, index) in quiz?.questions" :key="index">
				<content-quiz-mc :item="item" />
			</li>
		</ul>

		<button type="button" class="btn btn-default" @click="submit">
			Submit
		</button>
	</div>
</template>

<script>
export default {
	data: () => ({
		time_taken: null,
		questions: []
	}),

	computed: {
		id() {
			return this.$route.params.id
		},
		quiz() {
			return this.$store.state.quiz.quiz
		}
	},

	methods: {
		submit() {
			this.$axios.post(`/v2/quiz`, {
				id: this.id,
				time_taken: this.time_taken ?? 10,
				questions: this.questions
			})
			.then(({ data }) => {
				this.$router.push(`/content/${this.quiz.content_id}#quiz`)
				this.$toast.success(data.message ?? 'Good job, kids!')
			})
		}
	},

	async fetch() {
		await this.$store.dispatch('quiz/show', this.id)
		this.questions = this.quiz.questions.map((question) => {
			return {
				id: question.id,
				answer: ''
			}
		})
	},
}
</script>
