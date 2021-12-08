<template>
	<div class="container">
		<p class="lead">Welcome, Caesar!</p>
		<button type="button" class="btn btn-success" @click="$toast.success('Yay. this is success toast!')">Success Toast</button>
		<button type="button" class="btn btn-danger" @click="$toast.danger('Wops.. something wrong!')">Error Toast</button>
	</div>
</template>

<script>
	export default {
		auth: false,
	}
</script>
