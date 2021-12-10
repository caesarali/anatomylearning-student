<template>
	<b-modal id="confirmDialog" content-class="border-0" centered hide-header no-close-on-backdrop no-close-on-esc footer-class="bg-light border-top-0">
		<div class="d-flex flex-column flex-sm-row align-items-start">

			<div v-if="isConfirmTo('submit')" class="d-flex flex-shrink-0 mx-auto align-items-center justify-content-center rounded-circle" style="width:4rem; height: 4rem; background-color:rgba(40, 167, 69, 0.1);" >
				<svg style="width: 2rem" class="text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>

			<div v-if="isConfirmTo('delete')" class="d-flex flex-shrink-0 mx-auto align-items-center justify-content-center rounded-circle" style="width:4rem; height: 4rem; background-color: rgba(253,232,232,1);">
				<svg style="width: 2rem" class="text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>

			<div class="text-center text-sm-left ml-sm-3 mt-2 mt-sm-0 w-100">
				<p class="lead mb-1">{{ title }}</p>
				<p class="mb-2 message">{{ message }}</p>
			</div>
		</div>

		<template #modal-footer="{ hide }" class="">
			<button type="button" class="btn btn-white" @click="hide()">Cancel</button>
			<button type="button" class="btn" :class="{ 'btn-success': isConfirmTo('submit'), 'btn-danger': isConfirmTo('delete') }">
				{{ title }}
			</button>
		</template>
	</b-modal>
</template>

<script>
export default {
	data: () => ({
		message: 'Are you sure you want to submit this?',
		confirmTo: 'submit',
		isShow: false,
	}),

	computed: {
		title() {
			return this.$confirm.title
		}
	},

	methods: {
		isConfirmTo(value) {
			return value == this.$confirm.type
		}
	},
}
</script>
