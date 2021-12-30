<template>
	<container>
		<div class="d-flex mb-3 align-items-center">
			<NuxtLink v-if="$route.query.parent_id" to="home" class="text-success text-decoration-none">
				<svg width="22" height="22" class="align-top mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back
			</NuxtLink>

			<p class="lead m-0 text-capitalize" v-else>Hi, {{ $auth.user.name }}.</p>

			<div class="btn-group btn-group-sm ml-auto rounded shadow-sm" role="group" aria-label="Basic example">
				<button type="button" class="btn btn-white" :class="{ 'done': view === 'list' }" @click="view = 'list'">
					<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
					</svg>
				</button>
				<button type="button" class="btn btn-white" :class="{ 'done': view === 'grid' }" @click="view = 'grid'">
					<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
					</svg>
				</button>
			</div>
		</div>

		<div class="row row-cols-1" :class="{ 'rowrow-cols-md-2 row-cols-lg-3': view === 'grid' }">
			<div class="col" v-for="(content) in contents" :key="content.id">
				<div class="card border-0 shadow-sm mb-3">
					<div class="card-body p-3">
						<div class="media">
							<img :src="`https://ui-avatars.com/api/?background=e7f8ee&color=38c172&bold=true&name=${content.topic}`" :alt="content.topic" class="mr-3 rounded d-none d-md-inline-block">
							<div class="media-body">
								<p class="lead text-truncate text-truncate-1 mb-1">
									<NuxtLink :to="`/content/${content.id}`" class="text-success text-decoration-none" v-if="!content.subcontent">
										{{ content.topic }}
									</NuxtLink>

									<NuxtLink :to="`/home?parent_id=${content.id}`" class="text-success text-decoration-none" v-else>
										{{ content.topic }}
									</NuxtLink>
								</p>
								<p class="text-secondary text-truncate text-truncate-1 mb-1">
									{{ content.introduction }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</container>
</template>

<script>
export default {
	data: () => ({
		view: 'list'
	}),

	computed: {
		contents() {
			return this.$store.state.content.list
		}
	},

	watch: {
		'$route.query': '$fetch'
	},

	async fetch() {
		await this.$store.dispatch('content/get', this.$route.query.parent_id)
		await this.$store.commit('content/setItem', {})
		await this.$store.commit('worksheet/reset')
		await this.$store.commit('quiz/reset')
	}
}
</script>
