<template lang="pug">
  div
    transition-group(name="fade-title" @after-enter="afterEnter")
      h1(v-if="showTitle" :key="category.title") {{ category.title }}
      button(v-if="showButton" :key="1" class="button" @click="filter('digiproved')") DigiProved 🤙
      button(v-if="showButton" :key="2" class="button" @click="filter('beginner')") Beginner
      button(v-if="showButton" :key="3" class="button" @click="filter('intermediate')") Intermediate
      button(v-if="showButton" :key="4" class="button" @click="filter('advanced')") Advanced
      p(v-if="showDesc" :key="category.desc") {{ category.desc }}
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
      showButton: false, 
      showCards: false,
      tagFilterValue: '',
    }
  },
  computed: {
    areCardsVisible() {
      return this.$store.getters['Sidebar/areCardsVisible']
    },
    category() {
      // get category based on route
      let category = this.$store.getters['data/sortByTitle'](this.categoryRouteTitle)

      // if filter is empty, return category as is
      if (!this.tagFilterValue) {
        return category
      }
      else {
        const includesTagValue = resource =>
          resource.tags.some(tag => tag.includes(this.tagFilterValue))

        // filter category resources based on tag and replace with result
        let filteredResources = category.resources.filter(includesTagValue)
        category.resources = filteredResources

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
    this.showButton = true
  },
  methods: {
    filter(value) {
      if (value != this.tagFilterValue)
        this.tagFilterValue = value
      else
        this.tagFilterValue = ''
    },
    setActiveCard(index) {
      this.activeCard = index
    },
    async createCopyUrl(resource) {
      try {
        const { path, cleanTitle } = resource
        await this.$copyText(`https://gem.digibende${path}`)
        this.setActiveCard(cleanTitle)
        this.$router.push(path)
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
  color: black;
  background-color: lightgray;
  border-radius: .3rem;
  margin: 0 .5rem .4rem 0;
  cursor: pointer;
}

.button:active {
  transform: translateY(0.5px);
  box-shadow: 0 0 0;
  outline: 0;
}
</style>
