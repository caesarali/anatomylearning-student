<template>
	<div class="row">
		<div class="col">
			<div class="py-2" :class="{ 'border-top': index > 0 }" v-for="(worksheet, index) in worksheets" :key="worksheet.id">
				<h3 class="lead">
					<NuxtLink :to="`/worksheet/${worksheet.id}`">
						{{ worksheet.name }}
					</NuxtLink>
				</h3>
				<p class="text-secondary">
					<b>Progress :</b> {{ worksheet.progress }}
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

	mounted() {
		this.$store.dispatch('worksheet/get', this.content.id)
	}
}
</script>
