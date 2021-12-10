<template>
	<div class="row">
		<div class="col">
			<div class="py-3" :class="{ 'border-top': index > 0 }" v-for="(quiz, index) in quizList" :key="quiz.id">
				<p class="mb-2">
					<NuxtLink :to="`/quiz/${quiz.id}`" class="text-decoration-none text-secondary">
						<strong>{{ quiz.name }}</strong> - {{ quiz.questions }} item
					</NuxtLink>
				</p>
				<p class="text-secondary mb-1">
					<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon align-text-top mr-1">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
					</svg>
					{{ types[quiz.type] }}
				</p>
				<p class="text-secondary mb-1" v-if="quiz.duration">
					<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon align-text-top mr-1">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					{{ quiz.duration }} minutes
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () =>({
		types: {
			mc: 'Multiple Choice',
			sa: 'Short Answer'
		}
	}),

	computed: {
		contentId() {
			return this.$store.state.content.item.id
		},

		quizList() {
			return this.$store.state.quiz.list
		}
	},

	async fetch() {
		await this.$store.dispatch('quiz/get', this.contentId)
	}
}
</script>
