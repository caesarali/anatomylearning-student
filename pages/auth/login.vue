<template>
	<div class="container" style="height: 70vh">
		<div class="row justify-content-center align-items-center h-100">
			<div class="col-md-5">
				<div class="mb-4">
					<p class="lead">
						Sign In
					</p>
					<p class="mb-0 text-danger" v-if="errors.any()">
						{{ errors.first('email') }}
					</p>
				</div>

				<b-form @submit.prevent="login">
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text bg-white border-right-0" :class="{ 'border border-danger': errors.any() }">
									<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
									</svg>
								</span>
							</div>
							<input type="text" v-model="form.email" name="username" id="username" class="form-control border-left-0" :class="{ 'is-invalid': errors.any() }" placeholder="Username / email ..." required>
						</div>
					</div>
					<div class="form-group">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text bg-white border-right-0" :class="{ 'border border-danger': errors.any() }">
									<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
							</div>
							<input type="password" v-model="form.password" name="password" id="password" class="form-control border-left-0" :class="{ 'is-invalid': errors.any() }" placeholder="Password ..." required>
						</div>
					</div>
					<div class="form-group d-flex align-items-center">
						<div class="custom-control custom-checkbox mr-auto">
							<input type="checkbox" class="custom-control-input" id="customCheck1">
							<label class="custom-control-label" for="customCheck1">Remember me</label>
						</div>
						<button type="submit" class="btn btn-success">
							<svg width="24" height="24" class="align-top" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
							</svg>
							Login
						</button>
					</div>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import Error from '~/libs/error'
export default {
	auth: 'guest',
	data: () => ({
		form: {
			email: '',
			password: '',
			device_name: 'NuxtApp'
		},
		errors: new Error,
	}),

	methods: {
		login() {
			this.errors.clear()
			this.$auth.loginWith('local', {
				data: this.form
			})
			.then()
			.catch(({ response }) => this.errors.fill(response.data))
		}
	}
}
</script>
