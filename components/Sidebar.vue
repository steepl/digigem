<template lang="pug">
  aside.nav
    .sidebar
      template(v-for='category in categories')
        nuxt-link(:to='category.slug') {{ category.title }}
      hr
      nuxt-link(to='/dummy') Dummy
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      categories: [{ slug: '', title: '' }],
    }
  },
  computed: {
    areCardsVisible() {
      return this.$store.getters['Sidebar/areCardsVisible']
    },
  },
  created() {
    this.categories = this.$store.getters['data/resources'].map(({ title, slug }) => ({ title, slug }))
  },
  methods: {
    ...mapMutations({
      toggleCardsVisible: 'Sidebar/toggleCardsVisible',
    }),
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: sticky;
  top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  font-size: 14px;
  align-items: center;

  a {
    margin-bottom: 1rem;
    transform: skew(-15deg) rotate(-5deg) translate(-5px, 0);
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-weight: 600;
    transition-duration: 0.2s;
    transition-property: background-color,color;
    &:hover, &.nuxt-link-exact-active {
      background-color: #FC6E00;
      color: #fff;
      text-decoration: none;
    }
  }
  div {
    cursor: pointer;
  }
  .toggleWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: min-content;
    border: 1px;
    border-color: #FC6E00;
    border-style: solid;
    overflow: hidden;
    margin: 1rem auto;
  }
  .viewToggle {
    padding: .2rem.2rem;
    color: #409aff;
  }
  .active {
    background-color: #FC6E00;
    color: #272927;
  }
  hr {
        transform: skew(-15deg) rotate(-5deg) translate(-5px, 0);
    width: 80%;
    border-color: #FC6E00;
  }
}

@media (max-width: 600px) {
  .sidebar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));

    a {
      transform: none;
    }
  }
}
</style>
