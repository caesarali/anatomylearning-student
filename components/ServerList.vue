<template>
	<div>
		<ul class="list-group list-group-flush">
			<a href="#" class="list-group-item list-group-item-action" :class="{ active: server.endpoint == baseURL }" v-for="server in servers" :key="server.name" @click.prevent="setBaseURL(server.endpoint)">
				{{ server.name }}
			</a>
		</ul>
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
					{
						name: 'Local',
						endpoint: 'https://anatomi.test/api',
					},
				]
			}
		},

		methods: {
			setBaseURL(endpoint) {
				this.$auth.$storage.setUniversal('base-url', endpoint)
				this.baseURL = endpoint
			}
		},

		fetch() {
			this.baseURL = this.$auth.$storage.getUniversal('base-url')
		}
	}
</script>
