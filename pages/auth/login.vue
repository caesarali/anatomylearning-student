<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-body">
						<b-form>
							<div class="form-group">
								<input type="text" name="username" id="username" class="form-control" placeholder="Email / username ...">
							</div>
							<div class="form-group">
								<input type="password" name="password" id="password" class="form-control" placeholder="Password ...">
							</div>
							<div class="form-group">
								<button type="button" class="btn btn-primary" @click="login">
									Login
								</button>
							</div>
						</b-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	auth: 'guest',
	methods: {
		login() {
			this.$auth.loginWith('local', {
				data: {
					email: '082293425786',
					password: 'password',
					device_name: 'Browser'
				}
			})
		}
	}
}
</script>
