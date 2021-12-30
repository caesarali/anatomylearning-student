<template>
	<b-modal id="confirm-before-start-quiz" content-class="border-0 bg-transparent" body-class="p-0"
		centered
		hide-header
		hide-footer
		no-close-on-backdrop
		no-close-on-esc>
		<div class="text-center py-5 bg-light rounded-top">
			<img src="/svg/choose.svg" height="150">
		</div>

		<div class="px-2 py-5 bg-white rounded-bottom">
			<p class="h4 text-center mb-3">
				<strong>Are you ready ?</strong>
			</p>
			<p class="text-center mb-4" v-if="quiz">
				{{ types[quiz.type] }}, {{ quiz.questions }} numbers.
				<span v-if="quiz.duration">
					Finish within <strong><u>{{ quiz.duration }} minutes</u></strong>.
					<br>
					Timer will start when you klik the <b>Start</b> button.
				</span>
			</p>

			<div class="text-center">
				<div class="btn-group">
					<button class="btn btn-success shadow-sm px-3" @click="agree">
						Start. I'm ready!
					</button>
					<button class="btn btn-outline-success shadow-sm px-5" @click="cancel">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</b-modal>
</template>

<script>
export default {
	data: () => ({
		quiz: null
	}),

	props: {
		types: Object
	},

	methods: {
		open(quiz) {
			this.quiz = quiz
			this.$bvModal.show('confirm-before-start-quiz')
			return new Promise((resolve, reject) => {
				this.resolve = resolve
				this.reject = reject
			})
		},

		agree() {
			this.resolve(true)
			this.$bvModal.hide('confirm-before-start-quiz')
		},

		cancel() {
			this.reject
			this.$bvModal.hide('confirm-before-start-quiz')
		}
	}
}
</script>
