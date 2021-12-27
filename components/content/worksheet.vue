<template>
	<div class="row">
		<div class="col-md-4" v-for="worksheet in worksheets" :key="worksheet.id">
			<div class="card border-0 shadow-sm">
				<NuxtLink :to="`/worksheet/${worksheet.id}`" class="card-body p-2 text-secondary text-decoration-none">
					<div class="media">
						<img :src="`https://ui-avatars.com/api/?background=e7f8ee&color=38c172&bold=true&name=${worksheet.name}`" :alt="worksheet.name" class="mr-3 rounded">
						<div class="media-body align-self-center">
							<p class="mb-1">
								<strong>{{ worksheet.name }}</strong>
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
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		contentId() {
			return this.$route.params.id
		},
		worksheets() {
			return this.$store.state.worksheet.list
		}
	},

	mounted() {
		this.$store.dispatch('worksheet/get', this.contentId)
	}
}
</script>
