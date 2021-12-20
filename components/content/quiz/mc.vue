<template>
	<div>
		<p style="white-space: pre-wrap">{{ item.question }}</p>
		<div class="d-flex">
			<img v-if="!$isEmpty(item.attachment)" loading="lazy" :src="item.attachment" class="img-fluid d-block mr-5" style="max-height: 150px">

			<div class="d-block flex-grow-1" v-if="item.options.type == 'text'">
				<template v-for="(option, index) in item.options">
					<div class="form-group" v-if="index != 'type'" :key="index">
						<div class="custom-control custom-radio">
							<input type="radio" :id="`${index}|${item.id}`" v-model="answer" :value="index" class="custom-control-input">
							<label class="custom-control-label" :for="`${index}|${item.id}`">
								{{ option }}
							</label>
						</div>
					</div>
				</template>
			</div>
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
		}
	},
}
</script>
