<template>
	<container v-if="!$fetchState.pending">
		<template #toolbar>
			<nav class="navbar navbar-expand-lg navbar-light bg-white border-top shadow-sm">
				<div class="container">
					<ul class="navbar-nav mr-auto">
						<li class="nav-item">
							<NuxtLink :to="`/content/${worksheet.content_id}#worksheet`" class="nav-link pl-0 text-success">
								<svg width="22" height="22" class="align-top mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
								{{ worksheet.name }}
							</NuxtLink>
						</li>
					</ul>

					<ul class="navbar-nav">
						<li class="nav-item">
							<span class="nav-link" :class="(number < 2) ? 'disabled' : 'pointer'" @click="show(item_index-1)">
								<svg width="22" height="22" class="align-top" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
								</svg>
							</span>
						</li>
						<li class="nav-item">
							<span class="nav-link font-weight-bold">
								{{ `${number}/${items.length}` }}
							</span>
						</li>
						<li class="nav-item">
							<span class="nav-link" :class="(number >= items.length) ? 'disabled' : 'pointer'" @click="show(item_index+1)">
								<svg width="22" height="22" class="align-top" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</li>
						<template v-if="! worksheetIsComplete">
							<li class="nav-item d-flex align-center">
								<a href="#" class="nav-link text-secondary" :class="{ 'disabled': saving }" @click="save">
									{{ saving ? 'Saving progress...' : 'SAVE' }}
								</a>
							</li>
							<li class="nav-item d-flex align-center">
								<a href="#" class="nav-link text-success" @click="submit">
									SUBMIT
								</a>
							</li>
						</template>
					</ul>
				</div>
			</nav>
		</template>

		<div class="row">
			<div class="col-md">
				<template v-for="(item, index) in worksheet?.items">
					<div :key="item.id" v-show="index === item_index">
						<worksheet-item :readonly="worksheetIsComplete" :item="item" :form="items[index]" />
					</div>
				</template>
			</div>
			<div class="col-md-auto">
				<template v-for="(item, index) in worksheet?.items">
					<button type="button" class="btn btn-white shadow-sm m-1" :class="{ 'active': index == item_index }" style="width: 42px; height: 42px" :key="item.id" @click="show(index)">
						{{ index+1 }}
					</button>

					<br :key="index" v-if="((index+1) % 5) === 0">
				</template>
			</div>
		</div>
	</container>
</template>

<style scoped>

</style>

<script>
import Error from '~/libs/error'
export default {
	data: () => ({
		item_index: 0,
		items: [],
		errors: new Error,
		saving: false,
	}),

	computed: {
		number() {
			return this.item_index+1
		},
		id() {
			return this.$route.params.id
		},
		worksheet() {
			return this.$store.state.worksheet.worksheet
		},
		worksheetIsComplete() {
			return this.worksheet.progress == 'complete'
		},
	},

	methods: {
		show(index) {
			this.item_index = index
		},

		save() {
			if (!this.saving) {
				this.saving = true
				this.$axios.post(`/v2/worksheet/${this.id}`, {
					items: this.items
				})
				.then(({ data }) => {
					this.saving = false
					this.$toast.success(data.message ?? 'Saved.')
				})
			}
		},

		submit() {
			if (confirm('Are you sure to submit your worksheet progress ?')) {
				this.$axios.post(`/v2/worksheet/${this.id}`, {
					items: this.items,
					page: 'finish'
				})
				.then(({ data }) => {
					this.$toast.success(data.message ?? 'Good job, kids!')
					this.$nuxt.refresh()
				})
			}
		}
	},

	async fetch() {
		await this.$store.dispatch('worksheet/show', this.id)

		this.items = this.worksheet.items.map(item => {
			let answer = new Array(item.input_required);

			for (let index = 0; index < answer.length; index++) {
				answer[index] = this.$isEmpty(item.answer) ? '' : item.answer[index] ;
			}

			return {
				id: item.id,
				answer: answer
			}
		})
	},
}
</script>
