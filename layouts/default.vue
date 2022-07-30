<template>
	<div>
		<AlertConfirmToSubmit ref="confirmToSubmit" />
		<AlertConfirmToDelete ref="confirmToDelete" />
		<AlertConfirm />

		<b-modal id="choose-server" title="Choose server :" centered hide-footer no-close-on-backdrop no-close-on-esc>
			<ServerList />
		</b-modal>

		<header class="shadow-sm">
			<b-navbar toggleable="sm" variant="faded" type="light" class="bg-white">
				<div class="container">
					<b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

					<b-navbar-brand to="/">
						<NuxtLogo style="height: 30px" />
					</b-navbar-brand>

					<b-collapse id="nav-text-collapse" is-nav>
						<template v-if="$auth.loggedIn">
							<b-navbar-nav>
								<b-nav-item to="/home">
									Home
								</b-nav-item>
							</b-navbar-nav>

							<form class="form-inline ml-auto d-none d-md-flex">
								<input class="form-control border-0 bg-body" style="width: 500px" type="search" placeholder="Search" aria-label="Search">
							</form>
						</template>

						<b-navbar-nav class="ml-auto">
							<template v-if="! $auth.loggedIn">
								<b-nav-item @click="$bvModal.show('choose-server')">
									Choose Server
								</b-nav-item>
								<b-nav-item to="/auth/login">
									Login
								</b-nav-item>
							</template>
							<b-nav-item-dropdown toggle-class="p-0" no-caret v-else>
								<template #button-content>
									<img :src="`https://ui-avatars.com/api/?background=e7f8ee&color=38c172&bold=true&name=${$auth.user.name}`" :alt="$auth.user.name" height="35px" class="rounded-circle">
								</template>

								<b-dropdown-text class="text-secondary">
									Hi, <span class="text-capitalize">{{ $auth.user.name }}</span>
								</b-dropdown-text>

								<div class="dropdown-divider"></div>

								<b-dropdown-item href="#">Account</b-dropdown-item>
								<b-dropdown-item @click="$auth.logout('local')">
									Logout
								</b-dropdown-item>
							</b-nav-item-dropdown>
						</b-navbar-nav>
					</b-collapse>
				</div>
			</b-navbar>
		</header>

		<section>
			<Nuxt />
		</section>
	</div>
</template>
