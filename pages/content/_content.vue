<template>
	<div class="container">
		<b-tabs content-class="mt-3">

			<b-tab title="Intro" active lazy>
				<content-intro />
			</b-tab>

			<b-tab title="Worksheets" lazy>
				<content-worksheet />
			</b-tab>

			<b-tab title="Quiz" lazy>
				<content-quiz />
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
			return this.$route.params.content;
		},
		content() {
			return this.$store.state.content.item
		}
	},

	mounted() {
		this.$store.dispatch('content/show', this.id)
		this.$store.commit('worksheet/reset')
	},
}
</script>
