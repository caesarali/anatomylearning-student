<template>
	<div class="container">
		<p>
			Worksheet : {{ worksheet.name }}
		</p>

		<hr>

		<div class="row">
			<div class="col-md-9">
				<p><strong>Question :</strong> <br> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis est, repudiandae mollitia dolor soluta commodi doloribus nam veritatis! Nisi ipsam error libero nulla placeat magnam aliquam ullam deserunt. Animi, non?</p>
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
								<div class="input-group" :class="{ 'is-invalid': errors.answer && form.answer[i] == null }">
									<div class="input-group-prepend">
										<span class="input-group-text bg-white border-right-0" :class="{ 'border border-danger': errors.answer && form.answer[i] == null }">
											{{ numb }}
										</span>
									</div>
									<input type="search" v-model="form.answer[i]" placeholder="Required.." required class="border-left-0 form-control" :class="{ 'is-invalid': errors.answer && form.answer[i] == null }">
								</div>
								<div class="invalid-feedback">
									Please filled this before switch to the next page.
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="d-flex flex-wrap justify-content-center mb-3">
					<a href="#" class="border rounded m-1 text-center text-secondary text-decoration-none" style="height: 50px; width: 50px" v-for="number in worksheet?.items?.length" :key="number" @click="moveTo(number-1)">
						<strong>{{ number }}</strong>
					</a>
				</div>
				<button type="button" class="btn btn-success btn-block">
					Submit
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			index: 0,
			form: {
				answer: []
			},
			errors: {},
		}
	},

	computed: {
		id() {
			return this.$route.params.id
		},
		worksheet() {
			return this.$store.state.worksheet.worksheet
		},
		item() {
			return this.worksheet.items?.at(this.index)
		}
	},

	methods: {
		async moveTo(index) {
			await this.$axios.post(`/my/worksheet/${this.worksheet.id}/items`, {
				item_id: this.item.id,
				answer: this.form.answer.filter((item) => item != null),
			})
			.then(() => {
				this.$store.dispatch('worksheet/show', this.id)
				this.index = index
			})
			.catch(({ response }) => {
				this.errors = response.data.errors
			})
		},
	},

	watch: {
		item(item) {
			this.errors = {}
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
		this.$store.dispatch('worksheet/show', this.id)
	}
}
</script>
