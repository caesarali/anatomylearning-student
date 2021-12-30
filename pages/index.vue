<template>
	<container>
		<p class="lead">Welcome <span v-if="$auth.loggedIn" class="text-capitalize">, {{ $auth.user.name }}</span> !</p>
		<button type="button" class="btn btn-success" @click="$toast.success('Yay. this is success toast!')">Success Toast</button>
		<button type="button" class="btn btn-danger" @click="$toast.error('Wops.. something wrong!')">Error Toast</button>
		<button type="button" class="btn btn-success" @click="$confirm.toSubmit()">Submit Confirmation</button>
		<button type="button" class="btn btn-danger" @click="$confirm.toDelete()">Delete Confirmation</button>
	</container>
</template>

<script>
	export default {
		auth: false,
	}
</script>
