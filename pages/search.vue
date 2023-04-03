<template>
	<div>
		<transition name="fade" @after-enter="afterEnter">
			<h1 v-if="showTitle">Zoeken & Filteren</h1>
		</transition>
		<transition name="fade">
			<div v-if="areCardsVisible && showCards" class="cards">
				<template v-if="items.length">
					<Card
						v-for="(item, index) in items"
						:key="index + item.title"
						:resource="item"
						:create-copy-url="createCopyUrl"
						:is-active="activeCard === item.cleanTitle"
					></Card>
				</template>
				<p v-else>
					Geen resultaten gevonden...
					<br />
					<NuxtLink class="text-[0.7rem]" to="/">Terug naar home</NuxtLink>
				</p>
			</div>
		</transition>
	</div>
</template>

<script>
import * as R from "ramda";
import Card from "../components/Card";

export default {
	components: { Card },
	data() {
		return {
			activeCard: "",
			items: [],
			searchInput: {},
			showTitle: false,
			showCards: false,
			debounceID: 0,
		};
	},
	computed: {
		areCardsVisible() {
			return this.$store.getters["Sidebar/areCardsVisible"];
		},
	},
	watch: {
		$route(updatedChanges) {
			clearTimeout(this.debounceID);
			const updateSearch = () => {
				const keywords = updatedChanges.query.keywords;
				this.searchInput = {
					keywords: keywords && R.split(",", keywords),
				};
			};

			if (updatedChanges.query.enter !== "true")
				this.debounceID = setTimeout(updateSearch, 300);
			else updateSearch();
		},
		searchInput(searchInput) {
			this.items = this.$store.getters["data/findBySearchInputs"](
				searchInput.keywords
			);
		},
	},
	mounted() {
		this.showTitle = true;

		const keywords = this.$route.query.keywords;
		this.searchInput = {
			keywords: keywords && R.split(",", keywords),
		};
	},
	methods: {
		async createCopyUrl(resource) {
			try {
				const { url } = resource;
				await this.$copyText(url);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error("Failed to copy: ", err);
			}
		},
		afterEnter() {
			this.showCards = true;
		},
	},
};
</script>
