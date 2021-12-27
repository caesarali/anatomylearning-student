<template>
	<div>
		<AlertConfirmToSubmit ref="confirmToSubmit" />
		<AlertConfirmToDelete ref="confirmToDelete" />
		<AlertConfirm />

		<header class="shadow-sm">
			<b-navbar toggleable="sm" variant="faded" type="light" class="bg-white">
				<div class="container">
					<b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

					<b-navbar-brand to="/">
						<NuxtLogo style="height: 30px" />
					</b-navbar-brand>

					<b-collapse id="nav-text-collapse" is-nav>
						<b-navbar-nav v-if="$auth.loggedIn">
							<b-nav-item to="/home">
								Home
							</b-nav-item>
						</b-navbar-nav>

						<b-navbar-nav class="ml-auto">
							<template v-if="! $auth.loggedIn">
								<b-nav-item @click="$bvModal.show('choose-server')">
									Choose Server
								</b-nav-item>
								<b-nav-item to="/auth/login">
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

		<b-modal id="choose-server" title="Choose server :" centered hide-footer no-close-on-backdrop no-close-on-esc>
			<ServerList />
		</b-modal>

		<section>
			<Nuxt />
		</section>
	</div>
</template>
