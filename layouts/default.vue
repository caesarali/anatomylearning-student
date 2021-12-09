<template>
	<div>
		<AlertConfirmToSubmit ref="confirmToSubmit" />
		<AlertConfirmToDelete ref="confirmToDelete" />

		<header class="shadow-sm">
			<b-navbar toggleable="sm" variant="faded" type="light">
				<div class="container">
					<b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

					<b-navbar-brand to="/">
						<NuxtLogo style="height: 30px" />
					</b-navbar-brand>

					<b-collapse id="nav-text-collapse" is-nav>
						<b-navbar-nav v-if="this.$auth.loggedIn">
							<b-nav-item to="/home">
								Home
							</b-nav-item>
						</b-navbar-nav>

						<b-navbar-nav class="ml-auto">
							<template v-if="! this.$auth.loggedIn">
								<b-nav-item to="/choose-server" active-class>
									Choose Server
								</b-nav-item>
								<b-nav-item to="/auth/login" active-class>
									Login
								</b-nav-item>
							</template>
							<b-nav-item @click="$auth.logout('local')" v-else>
								Logout
							</b-nav-item>
						</b-navbar-nav>
					</b-collapse>
				</div>
			</b-navbar>
		</header>

		<section id="content" class="my-4">
			<Nuxt />
		</section>
	</div>
</template>
