<template>
	<aside class="nav">
		<div
			class="sidebar sticky top-3 grid xs:grid-cols-1 items-center grid-cols-[repeat(auto-fit,_minmax(6rem,_1fr))]"
		>
			<template v-for="category in categories">
				<nuxt-link
					:key="category.id"
					class="rounded-lg cursor-pointer xs:mr-0 mr-2 mb-4 p-2 font-semibold transition-all duration-200 no-underline hover:no-underline hover:bg-[#FC6E00] hover:text-white xs:-skew-y-6 xs:-skew-x-6 xs:-rotate-5 xs:-translate-x-5"
					:to="category.slug"
					>{{ category.title }}</nuxt-link
				>
			</template>
		</div>
	</aside>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	data() {
		return {
			categories: [{ slug: "", title: "" }],
		};
	},
	computed: {
		areCardsVisible() {
			return this.$store.getters["Sidebar/areCardsVisible"];
		},
	},
	created() {
		this.categories = this.$store.getters["data/resources"].map(
			({ title, slug }) => ({ title, slug })
		);
	},
	methods: {
		...mapMutations({
			toggleCardsVisible: "Sidebar/toggleCardsVisible",
		}),
	},
};
</script>
