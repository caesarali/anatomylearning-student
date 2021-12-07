export default {
	ssr: false,
	target: 'static',

	head: {
		title: 'Anatomy Learning',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
			{
				hid: 'description',
				name: 'description',
				content: ''
			},
			{
				name: 'format-detection',
				content: 'telephone=no'
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	plugins: [
		'~/plugins/axios',
		'~/plugins/inject',
	],

	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/auth-next',
	],

	router: {
		middleware: ['auth']
	},

	axios: {
        baseURL: 'https://dev.anatomylearningfkuh.com/api'
    },

	auth: {
		redirect: {
			login: '/auth/login',
			home: '/home'
		},
		strategies: {
			laravelSanctum: {
				provider: 'laravel/sanctum',
				url: 'https://dev.anatomylearningfkuh.com/api/login'
			},
			local: {
				user: {
					property: 'data',
				},
                endpoints: {
                    login: { url: '/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/logout', method: 'post' },
                    user: { url: '/my/profile', method: 'get', propertyName: 'data' }
                }
            }
		},
	},

	loading: {
		color: '#00dc82',
		height: '5px'
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			plugins: [
				'@babel/plugin-proposal-optional-chaining'
			]
		},
		loaders: {
			vue: {
				compiler: require('vue-template-babel-compiler')
			}
		},
	}
}
