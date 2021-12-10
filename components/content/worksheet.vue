<template>
	<div class="row">
		<div class="col">
			<div class="py-3" :class="{ 'border-top': index > 0 }" v-for="(worksheet, index) in worksheets" :key="worksheet.id">
				<p class="mb-1">
					<NuxtLink :to="`/worksheet/${worksheet.id}`" class="text-secondary text-decoration-none">
						<strong>{{ worksheet.name }}</strong>
					</NuxtLink>
				</p>
				<p class="mb-0">
					<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon text-success align-text-top mr-1" v-if="worksheet.progress == 'Complete'">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon text-secondary align-text-top mr-1" v-else>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					{{ worksheet.progress }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		content() {
			return this.$store.state.content.item
		},
		worksheets() {
			return this.$store.state.worksheet.list
		}
	},

	async fetch() {
		await this.$store.dispatch('worksheet/get', this.content.id)
	}
}
</script>
