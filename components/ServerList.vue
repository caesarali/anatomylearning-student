<template>
	<div>
		<p class="lead text-center">Choose server:</p>

		<div class="row justify-content-center">
			<div class="col-md-4">
				<ul class="list-group">
					<a href="#" class="list-group-item list-group-item-action" :class="{ active: server.endpoint == baseURL }" v-for="server in servers" :key="server.name" @click.prevent="setbaseURL(server.endpoint)">
						{{ server.name }}
					</a>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		auth: 'guest',
		data() {
			return {
				baseURL: '',
				servers: [
					{
						name: 'Medical',
						endpoint: 'https://med.anatomylearningfkuh.com/api',
					},
					{
						name: 'Dentist',
						endpoint: 'https://dent.anatomylearningfkuh.com/api',
					},
					{
						name: 'Development',
						endpoint: 'https://dev.anatomylearningfkuh.com/api',
					},
				]
			}
		},

		methods: {
			setbaseURL(endpoint) {
				this.$auth.$storage.setUniversal('base-url', endpoint)
				this.baseURL = endpoint
			}
		},

		mounted() {
			this.baseURL = this.$auth.$storage.getUniversal('base-url')
		}
	}
</script>
