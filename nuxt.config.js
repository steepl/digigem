import pkg from "./package";
import resources from "./resources/";

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "Digigem - Knowledge Base",
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: pkg.description },
			{ name: "format-detection", content: "telephone=no" },
			{ name: "og:title", content: "Digigem - Knowledge Base" },
			{ name: "og:description", content: pkg.description },
			{ name: "og:type", content: "website" },
			{ name: "og:image", content: "/assets/logo.png" },
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap",
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		// SCSS file in the project
		"@/assets/css/main.scss",
	],

	// Generates
	generate: {
		routes: resources.map((category) => category.slug),
	},

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
		// https://go.nuxtjs.dev/svg
		"@nuxtjs/svg",
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ["nuxt-clipboard"],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {},
				},
			},
		},
	},
};
