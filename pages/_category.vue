<template>
	<div>
		<transition-group name="fade" @after-enter="afterEnter">
			<h1 v-if="showTitle" :key="category.title">{{ category.title }}</h1>
			<template v-for="filterTag in category.filterTags">
				<button
					:key="filterTag"
					class="button cursor-pointer py-0 px-2 min-h-[34px] [&.buttonActive]:border-[#ff6928] text-white rounded-md mr-3 mb-8 border-2 shadow-sm border-[#1d1c1c] bg-[#121312]"
					type="button"
					@click="enableFilter($event, filterTag)"
				>
					{{ filterTag }}
				</button>
			</template>
		</transition-group>
		<transition name="fade">
			<div v-if="areCardsVisible &amp;&amp; showCards" class="cards">
				<template v-for="resource in category.resources">
					<Card
						:key="resource.title"
						:resource="resource"
						:create-copy-url="createCopyUrl"
						:is-active="activeCard === resource.cleanTitle"
					></Card>
				</template>
			</div>
		</transition>
	</div>
</template>

<script>
import Card from "../components/Card";

export default {
	components: { Card },
	data() {
		return {
			categoryRouteTitle: this.$route.params.category,
			index: "",
			activeCard: "",
			showTitle: false,
			showDesc: false,
			showCards: false,
			currentFilterTags: [],
		};
	},
	computed: {
		areCardsVisible() {
			return this.$store.getters["Sidebar/areCardsVisible"];
		},
		category() {
			const category = this.$store.getters["data/sortByTitle"](
				this.categoryRouteTitle
			);
			if (this.currentFilterTags.length === 0) {
				return category;
			} else {
				// replace category resources with resources based on active filter tags
				category.resources = this.$store.getters["data/sortByTitleAndTags"](
					this.categoryRouteTitle,
					this.currentFilterTags
				);
				return category;
			}
		},
	},
	created() {
		this.activeCard = this.$route.query.card || "";
	},
	mounted() {
		this.showTitle = true;
		this.showDesc = true;
	},
	methods: {
		enableFilter(event, tag) {
			// toggle active class on button
			event.target.classList.toggle("buttonActive");
			if (!this.currentFilterTags.includes(tag)) {
				this.currentFilterTags.push(tag);
			} else {
				const tagIndex = this.currentFilterTags.indexOf(tag);
				this.currentFilterTags.splice(tagIndex, 1);
			}
		},
		setActiveCard(index) {
			this.activeCard = index;
		},
		async createCopyUrl(resource) {
			try {
				const { url, cleanTitle } = resource;
				await this.$copyText(url);
				this.setActiveCard(cleanTitle);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.error(err);
			}
		},
		afterEnter() {
			this.showCards = true;
		},
	},
};
</script>
