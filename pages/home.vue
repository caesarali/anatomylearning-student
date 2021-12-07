<template>
	<div class="container">
		<p class="lead">Content List.</p>

		<div class="row">
			<div class="col">
				<div class="py-2" :class="{ 'border-top': index > 0 }" v-for="(content, index) in contents" :key="content.id">
					<h3 class="lead">
						<NuxtLink :to="`/content/${content.id}`">
							# {{ content.topic }}
						</NuxtLink>
					</h3>
					<p class="text-secondary">{{ content.introduction }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		contents() {
			return this.$store.state.content.list
		}
	},

	async fetch() {
		await this.$store.dispatch('content/get')
		await this.$store.commit('content/setItem', {})
	}
}
</script>
