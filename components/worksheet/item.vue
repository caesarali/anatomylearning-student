<template>
	<div>
		<p v-if="item.question">
			{{ item.question }}
		</p>

		<div class="row">
			<div class="col-md-4">
				<b-img lazy fluid rounded :src="item.picture" class="border"></b-img>
			</div>
			<div class="col-md-8">
				<form>
					<div class="form-group" v-for="(value, i) in answer" :key="i">
						<div class="input-group"
							:class="{
								'is-invalid': readonly && !$isMatch(item.answer[i], item.keys[i]),
								'is-valid': readonly && $isMatch(item.answer[i], item.keys[i])
							}">
							<div class="input-group-prepend">
								<span class="input-group-text bg-white border-right-0"
									:class="{
										'border border-danger': readonly && !$isMatch(item.answer[i], item.keys[i]),
										'border border-success': readonly && $isMatch(item.answer[i], item.keys[i])
									}">
									{{ i+1 }}.
								</span>
							</div>
							<input type="search" v-model="answer[i]" class="border-left-0 form-control bg-white" :readonly="readonly" placeholder="Empty..." required
								:class="{
									'is-invalid': readonly && !$isMatch(item.answer[i], item.keys[i]),
									'is-valid': readonly && $isMatch(item.answer[i], item.keys[i])
								}">
						</div>

						<div class="invalid-feedback" v-if="readonly">
							The correct answer is "<u>{{ item.keys[i] }}</u>"
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		answer: []
	}),

	props: {
		readonly: Boolean,
		item: Object,
		form: Object
	},

	watch: {
		answer(value) {
			this.form.answer = value
		}
	},

	methods: {
		setAnswer() {
			let item = this.item
			let emptyString = new Array(item.input_required);

			for (let i = 0; i < emptyString.length; i++) {
				this.answer[i] = this.$isEmpty(item.answer) ? '' : item.answer[i] ;
			}
		}
	},

	mounted() {
		this.answer = this.form?.answer
	}
}
</script>
