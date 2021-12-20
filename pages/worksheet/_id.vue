<template>
	<div class="container">
		<p>
			<NuxtLink :to="`/content/${worksheet.content_id}#worksheet`" class="text-decoration-none text-success">
				<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				{{ worksheet.name }}
			</NuxtLink>
		</p>

		<hr>

		<div class="row">
			<div class="col-md-9">
				<p>
					<strong>Question :</strong> <br>
					{{ item?.question }}
				</p>
			</div>
		</div>

		<div class="row">
			<div class="col-md-9 ">
				<div class="row">
					<div class="col-md-4">
						<b-img lazy fluid rounded :src="item?.picture" class="border"></b-img>
					</div>
					<div class="col-md-8">
						<form ref="form">
							<div class="form-group" v-for="(numb, i) in item?.input_required" :key="numb">
								<div class="input-group"
									:class="{
											'is-invalid': errors.has('answer') && $isEmpty(form.answer[i]) || worksheetIsComplete && !$isMatch(item.answer[i], item.keys[i]),
											'is-valid': worksheetIsComplete && $isMatch(item.answer[i], item.keys[i])
									}">
									<div class="input-group-prepend">
										<span class="input-group-text bg-white border-right-0"
											:class="{
												'border border-danger': errors.has('answer') && $isEmpty(form.answer[i]) || worksheetIsComplete && !$isMatch(item.answer[i], item.keys[i]),
												'border border-success': worksheetIsComplete && $isMatch(item.answer[i], item.keys[i])
											}">
											{{ numb }}.
										</span>
									</div>
									<input type="search" v-model="form.answer[i]" class="border-left-0 form-control bg-white"
										:readonly="worksheetIsComplete"
										:class="{
											'is-invalid': errors.has('answer') && $isEmpty(form.answer[i]) || worksheetIsComplete && !$isMatch(item.answer[i], item.keys[i]),
											'is-valid': worksheetIsComplete && $isMatch(item.answer[i], item.keys[i])
										}"
										placeholder=". . . . . . ?" required>
								</div>
								<div class="invalid-feedback" v-if="!worksheetIsComplete">
									Please filled this before switch to the next page.
								</div>
								<div class="invalid-feedback" v-else>
									The correct answer is "<u>{{ item.keys[i] }}</u>"
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="d-flex flex-wrap justify-content-center mb-3">
					<a href="#" class="border rounded m-1 text-center text-secondary text-decoration-none" style="height: 50px; width: 50px" v-for="(item, index) in worksheet?.items" :key="item.id" @click="moveTo(index)">
						<strong>{{ index+1 }}</strong>
					</a>
				</div>
				<button type="button" class="btn btn-success btn-block" @click="submit" v-if="!worksheetIsComplete">
					Submit
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>

<script>
import Error from '~/libs/error'
export default {
	data: () => ({
		index: 0,
		form: {
			answer: []
		},
		errors: new Error,
	}),

	async fetch() {
		await this.$store.dispatch('worksheet/show', this.id)
	},

	computed: {
		id() {
			return this.$route.params.id
		},
		worksheet() {
			return this.$store.state.worksheet.worksheet
		},
		worksheetIsComplete() {
			return this.worksheet.progress == 'Complete'
		},
		item() {
			return this.worksheet.items?.at(this.index)
		}
	},

	methods: {
		async moveTo(index) {
			if (this.worksheetIsComplete) {
				this.index = index
			} else {
				await this.$axios.post(`/my/worksheet/${this.worksheet.id}/items`, {
					item_id: this.item.id,
					answer: this.form.answer.filter((item) => item != null && item != ''),
				})
				.then(() => {
					this.$store.dispatch('worksheet/show', this.id)
					this.index = index
				})
				.catch(({ response }) => {
					this.errors.fill(response.data)
				})
			}
		},

		async submit() {
			if (! this.worksheetIsComplete) {
				await this.$axios.post(`/my/worksheet/${this.worksheet.id}/items`, {
					item_id: this.item.id,
					answer: this.form.answer.filter((item) => item != null && item != ''),
					page: 'finish'
				})
				.then(({ data }) => {
					alert(data.message)
					this.$store.dispatch('worksheet/show', this.id)
					this.index = 0
				})
				.catch(({ response }) => this.errors.fill(response.data))
			}
		}
	},

	watch: {
		item(item) {
			this.errors.clear()
			this.form.answer = []

			if (item.answer?.length) {
				this.form.answer.push(...item.answer)
			}

			let emptyInput = new Array(item?.keys?.length - (item?.answer?.length ?? 0));

			for (let index = 0; index < emptyInput.length; index++) {
				emptyInput[index] = null;
			}

			this.form.answer.push(...emptyInput)
		}
	},

	mounted() {
		console.log(this.$store.state.worksheet)
	}
}
</script>
