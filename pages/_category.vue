<template lang="pug">
  div
    transition-group(name="fade-title" @after-enter="afterEnter")
      h1(v-if="showTitle" :key="category.title") {{ category.title }}
      template(v-for='filterTag in category.filterTags')
        button(:key="filterTag" class="button" type="button" @click="enableFilter($event, filterTag)") {{ filterTag }}

    transition(name="fade-card")
      .cards(v-if="areCardsVisible && showCards")
        template(v-for='resource in category.resources' )
          Card(:resource='resource' :key='resource.title' :createCopyUrl="createCopyUrl" :isActive='activeCard === resource.cleanTitle')
</template>

<script>
import Card from '../components/Card'

export default {
  components: { Card },
  data() {
    return {
      categoryRouteTitle: this.$route.params.category,
      index: '',
      activeCard: '',
      showTitle: false,
      showDesc: false,
      showCards: false,
      currentFilterTags: [],
    }
  },
  computed: {
    areCardsVisible() {
      return this.$store.getters['Sidebar/areCardsVisible']
    },
    category() {
      var category = this.$store.getters['data/sortByTitle'](this.categoryRouteTitle)
      if (this.currentFilterTags.length === 0) {
        return category
      }
      else {
        // replace category resources with filtered resources based on active filter tags
        category.resources = this.$store.getters['data/findByCategoryTitleAndTags'](this.categoryRouteTitle, this.currentFilterTags)
        return category
      }
    },
  },
  created() {
    this.activeCard = this.$route.query.card || ''
  },
  mounted() {
    this.showTitle = true
    this.showDesc = true
  },
  methods: {
    enableFilter(event, tag) {
      // toggle active class on button
      event.target.classList.toggle('buttonActive')
      if (!this.currentFilterTags.includes(tag)) {
          this.currentFilterTags.push(tag)
      }
      else {
          var tagIndex = this.currentFilterTags.indexOf(tag)
          this.currentFilterTags.splice(tagIndex, 1)
      }
    },
    setActiveCard(index) {
      this.activeCard = index
    },
    async createCopyUrl(resource) {
      try {
        const { url, cleanTitle } = resource
        await this.$copyText(url)
        this.setActiveCard(cleanTitle)
      } catch (e) {
        console.error(e)
      }
    },
    afterEnter() {
      this.showCards = true
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  table-layout: fixed;
}
.button {
  border: 2px solid #353535;
  color: #fdfdfd;
  background-color: #272927;
  border-radius: .3rem;
  margin: 0 .6rem 1.5rem 0;
  cursor: pointer;
  padding: 0 7px 0 7px;
  min-height: 34px;

  &Active {
    border: 2px groove darkorange;
  }
}
</style>
