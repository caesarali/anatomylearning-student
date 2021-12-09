export default class Error {
    constructor () {
		this.errors = {}
		this.message = null
	}

	clear() {
		this.errors = {}
		this.message = null
	}

	has(attribute) {
		return this.errors.hasOwnProperty(attribute)
	}

	fill(errors) {
		this.errors = errors.errors
		this.message = errors.message
	}

	first(attribute) {
		if (this.has(attribute)) {
			return this.errors[attribute][0]
		}

		return ''
	}

	any() {
		return Object.keys(this.errors).length > 0
	}
}
