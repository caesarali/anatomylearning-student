export default function (context) {
	// console.log(context.$auth.$storage.getUniversal('base-url'));
	// if (context.$auth.$storage.getUniversal('base-url')) {
	// 	return redirect('/choose-server');
	// }
	return context.redirect('/choose-server')
}
