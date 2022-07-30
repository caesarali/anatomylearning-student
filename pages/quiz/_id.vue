<template>
	<container v-if="!$fetchState.pending">
		<template #toolbar>
			<nav class="navbar navbar-expand-sm navbar-light bg-white border-top shadow-sm">
				<div class="container">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item">
							<NuxtLink :to="`/content/${quiz.content_id}#quiz`" class="nav-link text-success pl-0">
								<svg width="22" height="22" class="align-top mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
								{{ quiz.name }}
							</NuxtLink>
						</li>
					</ul>
					<ul class="navbar-nav" v-if="questions.length">
						<li class="nav-item">
							<span class="nav-link" :class="(number < 2) ? 'disabled' : 'pointer'" @click="show(number-1)">
								<svg class="align-top" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
							</span>
						</li>
						<li class="nav-item">
							<div class="nav-link">
								{{ `${number}/${questions.length}` }}
							</div>
						</li>
						<li class="nav-item">
							<span class="nav-link" :class="(number >= questions.length) ? 'disabled' : 'pointer'" @click="show(number+1)">
								<svg class="align-top" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</li>
						<li class="nav-item d-flex align-center">
							<a href="#" class="nav-link text-success" @click="submit">
								<svg class="align-top" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								SUBMIT
							</a>
						</li>
						<li class="nav-item" v-if="duration">
							<span class="nav-link text-success" :class="{ 'text-danger': duration <= 30 }">
								<span class="h4 mb-0">
									{{ timer }}
								</span>
							</span>
						</li>
					</ul>
				</div>
			</nav>
		</template>

		<div class="row">
			<div class="col-md">
				<template v-for="(item, index) in quiz?.questions">
					<div :key="item.id" v-show="index+1 == number">
						<component :is="`quiz-${quiz.type}`" :item="item" :form="questions[index]" />
					</div>
				</template>
			</div>
			<div class="col-md-auto" v-if="quiz?.questions.length > 1">
				<template v-for="(item, index) in quiz?.questions">
					<button type="button" class="btn btn-white shadow-sm mx-1" :class="{ 'active': index+1 == number, 'done': questions[index]?.answer != '' }" style="width: 45px; height: 45px" :key="item.id" @click="show(index+1)">
						{{ index+1 }}
					</button>
					<br :key="index" v-if="((index+1) % 5) === 0">
				</template>
			</div>
		</div>
	</container>
</template>

<script>
export default {
	data: () => ({
		number: 1,
		duration: 0,
		time_taken: 0,
		questions: [],
	}),

	computed: {
		id() {
			return this.$route.params.id
		},
		quiz() {
			return this.$store.state.quiz.quiz
		},
		timer() {
			let timer = this.duration
			let minutes = parseInt(timer / 60, 10)
			let seconds = parseInt(timer % 60, 10)

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			return `${minutes}:${seconds}`
		}
	},

	methods: {
		start(duration) {
			this.duration = duration
			let timer = setInterval(() => {
				if (this.duration > 0) {
					this.duration--
					this.time_taken++
				} else {
					clearInterval(timer)
				}
			}, 1000)
		},

		show(number) {
			this.number = number
		},

		submit() {
			if (confirm('Are you sure to submit your quiz sheet ?')) {
				this.$axios.post(`/v2/quiz/${this.id}`, {
					time_taken: Math.ceil(this.time_taken / 60),
					questions: this.questions
				})
				.then(({ data }) => {
					this.$router.push(`/content/${this.quiz.content_id}#quiz`)
					this.$toast.success(data.message ?? 'Good job, kids!')
				})
			}
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

		this.start(this.quiz.duration * 60)
	}
}
</script>
