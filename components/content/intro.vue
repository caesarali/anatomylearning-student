<template>
	<p>{{ intro }}</p>
</template>

<script>
export default {
	computed: {
		intro() {
			return this.$store.state.content.item.introduction
		}
	}
}
</script>
