<template>
	<div class="container">
		<p class="lead">Hi, {{ $auth.user.name }}.</p>

		<div class="row">
			<div class="col">
				<div class="py-2" :class="{ 'border-top': index > 0 }" v-for="(content, index) in contents" :key="content.id">
					<p class="lead mb-1">
						<NuxtLink :to="`/content/${content.id}`" class="text-success text-decoration-none">
							{{ content.topic }}
						</NuxtLink>
					</p>
					<p class="text-secondary" v-html="content.introduction"></p>
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
