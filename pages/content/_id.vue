<template>
	<container>
		<template #toolbar>
			<!-- <nav class="bg-white border-top shadow-sm">
				<div class="container">
					<NuxtLink to="/home" class="text-decoration-none text-success d-block py-3">
						<svg width="22" height="22" class="align-top mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</NuxtLink>
				</div>
			</nav> -->
			<div class="bg-white border-top shadow-sm">
				<div class="container d-flex">
					<NuxtLink to="/home" class="text-decoration-none text-success d-block py-3">
						<svg width="22" height="22" class="align-top mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						Back
					</NuxtLink>
					<!-- <div class="nav nav-custom nav-justified flex-grow-1 ml-4 border-0">
						<a class="nav-link text-capitalize py-3" v-for="tab in tabs" :href="tab.target" :key="tab.target" :class="{ 'active': isActive(tab.target) }" @click="setActive(tab.target)">
							{{ tab.title ?? content.topic }}

							<div class="spinner-border spinner-border-sm text-success" role="status" v-if="$fetchState.pending && tab.target == '#intro'">
								<span class="sr-only">Loading...</span>
							</div>
						</a>
					</div> -->
				</div>
			</div>
		</template>

		<b-tabs content-class="mt-3" justified no-nav-style nav-class="nav-custom">
			<b-tab :title="content.topic ?? 'About'" :active="isActive('#intro')" @click="setActive('#intro')" title-link-class="text-truncate">
				{{ content.introduction }}
			</b-tab>

			<b-tab title="Worksheets" lazy :active="isActive('#worksheet')" @click="setActive('#worksheet')">
				<content-worksheet />
			</b-tab>

			<b-tab title="Quiz" lazy :active="isActive('#quiz')" @click="setActive('#quiz')">
				<content-quiz />
			</b-tab>

			<b-tab title="Video" lazy :active="isActive('#video')" @click="setActive('#video')">
				<p>Coming soon...</p>
			</b-tab>

			<b-tab title="Atlas" lazy :active="isActive('#atlas')" @click="setActive('#atlas')">
				<p>Coming soon...</p>
			</b-tab>
		</b-tabs>
	</container>
</template>

<script>
export default {
	data: () => ({
		tabs: [
			{
				target: '#intro'
			},
			{
				title: 'worksheets',
				target: '#worksheet'
			},
			{
				title: 'quiz',
				target: '#quiz'
			},
			{
				title: 'video',
				target: '#video'
			},
			{
				title: 'atlas',
				target: '#atlas'
			}
		]
	}),

	computed: {
		id() {
			return this.$route.params.id;
		},
		content() {
			return this.$store.state.content.item
		},
		tab() {
			let hash = this.$route.hash
			return this.$isEmpty(hash) ? '#intro' : hash
		}
	},

	methods: {
		isActive(tab) {
			return this.tab === tab
		},
		setActive(tab) {
			this.$router.push(tab)
		}
	},

	async fetch() {
		await this.$store.dispatch('content/show', this.id)
	},
}
</script>
