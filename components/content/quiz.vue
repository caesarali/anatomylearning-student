<template>
	<div>
		<quiz-confirm-before-start ref="confirm" :types="types" />

		<div class="row">
			<div class="col-md-4" v-for="quiz in quizList" :key="quiz.id">
				<div class="card border-0 shadow-sm mb-4">
					<!-- <NuxtLink :to="`/quiz/${quiz.id}`" class="card-body p-2 text-decoration-none text-secondary">
						<div class="media">
							<img :src="`https://ui-avatars.com/api/?background=e7f8ee&color=38c172&bold=true&name=${quiz.type}`" :alt="quiz.type" class="mr-3 rounded">
							<div class="media-body align-self-center">
								<p class="font-weight-bold text-truncate mb-2">
									{{ quiz.name }}
								</p>

								<p class="mb-0">
									<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon align-text-top">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									{{ quiz.duration ? `${quiz.duration} minuts` : '-' }}
								</p>
							</div>
						</div>
					</NuxtLink> -->
					<a href="#" class="card-body p-2 text-decoration-none text-secondary pointer" @click.prevent="openQuiz(quiz)">
						<div class="media">
							<img :src="`https://ui-avatars.com/api/?background=e7f8ee&color=38c172&bold=true&name=${quiz.type}`" :alt="quiz.type" class="mr-3 rounded">
							<div class="media-body align-self-center">
								<p class="font-weight-bold text-truncate mb-2">
									{{ quiz.name }}
								</p>

								<p class="mb-0">
									<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon align-text-top">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									{{ quiz.duration ? `${quiz.duration} minuts` : '-' }}
								</p>
							</div>
						</div>
					</a>
				</div>
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
			return this.$route.params.id
		},

		quizList() {
			return this.$store.state.quiz.list
		}
	},

	methods: {
		openQuiz(quiz) {
			this.$refs.confirm.open(quiz)
				.then(() => this.$router.push(`/quiz/${quiz.id}`))
		}
	},

	mounted() {
		this.$store.dispatch('quiz/get', this.contentId)
	}
}
</script>
