<template>
	<container>
		<p class="lead">Hi, {{ $auth.user.name }}.</p>

		<div class="row">
			<div class="col">
				<div class="py-3 media" :class="{ 'border-top': index > 0 }" v-for="(content, index) in contents" :key="content.id">
					<img :src="`https://ui-avatars.com/api/?background=e7f8ee&color=38c172&bold=true&name=${content.topic}`" :alt="content.topic" class="mr-3 rounded">
					<div class="media-body">
						<p class="lead mb-1">
							<NuxtLink :to="`/content/${content.id}`" class="text-success text-decoration-none">
								{{ content.topic }}
							</NuxtLink>
						</p>
						<p class="text-secondary text-truncate text-truncate-2 mb-1">
							{{ content.introduction }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</container>
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
