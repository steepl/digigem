<template lang="pug">
  div
    transition-group(name="fade-title" @after-enter="afterEnter")
      h1(v-if="showTitle" :key="category.title") {{ category.title }}
      p(v-if="showDesc" :key="category.desc") {{ category.desc }}
    transition-group(name="fade-card")
      template(v-for='(resource, i) in category.resources')
        h2(v-if="showTitle" :key="resource.title") {{ resource.title }}
        p(v-if="showDesc" :key="resource.desc") {{ resource.desc }}
        .cards(v-if="areCardsVisible && showCards" :key="i")
          template(v-for='item in resource.items')
            Card(:resource='item' :key='item.title' :createCopyUrl="createCopyUrl" :isActive='activeCard === item.cleanTitle')
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
    }
  },
  computed: {
    areCardsVisible() {
      return this.$store.getters['Sidebar/areCardsVisible']
    },
    category() {
      return this.$store.getters['data/sortByTitle'](this.categoryRouteTitle)
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
    setActiveCard(index) {
      this.activeCard = index
    },
    async createCopyUrl(resource) {
      try {
        const { path, cleanTitle } = resource
        await this.$copyText(`https://webgems.io${path}`)
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
</style>
