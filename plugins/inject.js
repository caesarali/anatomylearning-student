export default ({ app }, inject) => {
	inject('isEmpty', value => value == null || value == '')
	inject('isMatch', (string1, string2) => string1.toLowerCase() == string2.toLowerCase())

	inject('isEmptyObject', value => Object.keys(value).length === 0 && value.constructor === Object)
}
