<template>
	<p>{{ content.introduction }}</p>
</template>

<script>
export default {
	computed: {
		content() {
			return this.$store.state.content.item
		}
	}
}
</script>
