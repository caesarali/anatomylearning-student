<template>
	<div>
		<p style="white-space: pre-wrap">{{ item.question }}</p>
		<div :class="{ 'd-flex align-items-center' : item.options.type == 'asdsad'}">
			<img v-if="!$isEmpty(item.attachment)" loading="lazy" :src="item.attachment" class="img-fluid" style="max-height: 150px">
			<hr class="my-4">
			<div class="d-flex flex-column flex-grow-1" v-if="item.options.type == 'text'">
				<template v-for="(option, index) in item.options">
					<div class="form-group mb-1" v-if="index != 'type'" :key="index">
						<label class="align-selt-top pointer" :class="{ 'text-success font-weight-bold': answer == index }">
							<input type="radio" v-model="answer" :value="index" hidden>
							<span class="mr-2 text-uppercase">{{ index }}.</span> {{ option }}
						</label>
					</div>
				</template>
			</div>

			<div class="d-flex flex-grow-1" v-if="item.options.type == 'picture'">
				<template v-for="(option, index) in item.options">
					<div class="form-group mr-3" v-if="index != 'type'" :key="index">
						<label class="d-flex pointer">
							<input type="radio" v-model="answer" :value="index" hidden>
							<span class="align-selt-top text-uppercase" :class="{ 'text-success font-weight-bold': answer == index }">
								{{ index }}.
							</span>
							<img loading="lazy" :src="option" alt="Not found" class="mx-2 img-thumbnail border" :class="{ 'border-success': answer == index }" style="width: 100px;">
						</label>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import '~/assets/scss/_variables';

	label:hover {
		color: $green !important;

		img {
			border-color: $green !important;
		}
	}
</style>

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
