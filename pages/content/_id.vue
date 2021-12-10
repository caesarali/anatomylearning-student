<template>
	<div class="container">
		<NuxtLink to="/home" class="text-decoration-none text-success">
			<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
			</svg>
			Back
		</NuxtLink>
		<hr class="mb-1">
		<b-tabs content-class="mt-3" justified no-nav-style nav-class="nav-custom">

			<b-tab :title="content.topic ?? 'About'" active lazy>
				<content-intro />
			</b-tab>

			<b-tab title="Worksheets" lazy>
				<content-worksheet />
			</b-tab>

			<b-tab title="Quiz" lazy>
				<content-quiz />
			</b-tab>

			<b-tab title="Video" lazy>
				<p>Coming soon...</p>
			</b-tab>

			<b-tab title="Atlas" lazy>
				<p>Coming soon...</p>
			</b-tab>
		</b-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tabs: [
				{ name: 'Intro' },
				{ name: 'Worksheets' },
				{ name: 'Quiz' },
				{ name: 'Videos' },
				{ name: 'Atlas' },
			]
		}
	},

	computed: {
		id() {
			return this.$route.params.id;
		},
		content() {
			return this.$store.state.content.item
		}
	},

	async fetch() {
		this.$store.dispatch('content/show', this.id)
		this.$store.commit('worksheet/reset')
	},
}
</script>
