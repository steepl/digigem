<template>
	<input
		v-model="searchInput"
		class="search rounded-lg border-none outline-none text-white bg-[#131212] shadow-md py-4 px-8"
		type="text"
		placeholder="Zoeken..."
		@keydown.enter="onEnter"
	/>
</template>

<script>
import * as R from "ramda";
import { isNotEmpty } from "../utils/pure";

export default {
	data() {
		return {
			searchInput: "",
			searchPath: "/search",
		};
	},
	watch: {
		searchInput(input) {
			const words = R.filter(isNotEmpty, R.split(" ", input));
			const titles = R.filter(R.compose(R.not, this.isTag), words);

			const searchParams = new URLSearchParams();
			if (isNotEmpty(titles)) searchParams.append("keywords", titles);

			this.$router.push(this.searchPath + "?" + searchParams.toString());
		},
	},
	mounted() {
		let keywords = this.$route.query.keywords || "";
		keywords = keywords.split(",").join(" ");

		this.searchInput = `${keywords}`.trim();
	},
	methods: {
		// isTag :: String -> Bool
		isTag: R.startsWith("#"),

		// removeFirstChar :: String -> String
		removeFirstChar: R.compose(
			R.join(""),
			R.adjust(0, () => "")
		),
		onEnter() {
			const searchParams = new URLSearchParams({
				...this.$route.query,
				enter: true,
			});
			this.$router.push(this.searchPath + "?" + searchParams.toString());
		},
	},
};
</script>
