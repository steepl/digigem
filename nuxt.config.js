import pkg from './package'
import resources from './resources/'

export default {

  vue: {
    config: {
      devtools: true,
    },
  },

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Digigem – Resource Base',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'keywords', name: 'keywords', content: 'css, html, php, server, resources, design, gems, nuxt, javascript, tutorials, development, software, js, vue, seo, rust, sql, databases'},

      { name: 'robots', content: 'index, follow' },
      { name: 'distribution', content: 'global'},

      { name:'theme-color', content: '#da532c' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { rel:'manifest', href:'/site.webmanifest' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
  ** Generate dynamic routes
  */
  generate: {
    routes: resources.map(category => category.slug),
  },

  /**
   * Configure ESLint to run on save with hot reloading
   */
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#da532c' },

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-clipboard2',
  ],
}
