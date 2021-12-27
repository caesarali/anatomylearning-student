<template>
	<div>
		<p style="white-space: pre-wrap">{{ item.question }}</p>
		<img v-if="!$isEmpty(item.attachment)" loading="lazy" :src="item.attachment" class="img-fluid img-thumbnail mr-5 mb-4" style="max-height: 200px">
		<div class="form-group">
			<textarea class="form-control" rows="3" v-model="answer" placeholder="Type your answer here.."></textarea>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		answer: ''
	}),

	props: {
		item: Object,
	},

	watch: {
		answer(value) {
			this.question.answer = value
		}
	},

	computed: {
		question() {
			return this.$parent.questions.find((question) => question.id == this.item.id)
		},
	},
}
</script>
