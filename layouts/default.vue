<template>
	<div class="layout">
		<Logo />
		<Search />
		<Sidebar />
		<nuxt class="content"></nuxt>
	</div>
</template>

<script>
import Logo from "../components/Logo";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import pkg from "../package";

export default {
	components: {
		Logo,
		Search,
		Sidebar,
	},
	data() {
		return {
			prodBaseUrl: "https://gem.digibende",
			showNotice: false,
		};
	},
	head() {
		return {
			meta: [
				{ hid: "og:title", property: "og:title", content: pkg.name },
				{
					hid: "og:description",
					property: "og:description",
					content: pkg.description,
				},
				{ hid: "og:image", property: "og:image", content: this.prodBaseUrl },
				{ hid: "og:url", property: "og:url", content: this.prodBaseUrl },
			],
		};
	},
};
</script>
