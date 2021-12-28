<template>
	<container>
		<template #toolbar>
			<nav class="bg-white border-top shadow-sm">
				<div class="container">
					<NuxtLink to="/home" class="text-decoration-none text-success d-block py-3">
						<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
						</svg>
						Back
					</NuxtLink>
				</div>
			</nav>
		</template>

		<b-tabs content-class="mt-3" justified no-nav-style nav-class="nav-custom">
			<b-tab :title="content.topic ?? 'About'" :active="isActive('#intro')" @click="setActive('#intro')">
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
	computed: {
		id() {
			return this.$route.params.id;
		},
		content() {
			return this.$store.state.content.item
		},
		tab() {
			return this.$route.hash ?? '#intro'
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
		// await this.$store.commit('worksheet/reset')
		// await this.$store.commit('quiz/reset')
	},
}
</script>
