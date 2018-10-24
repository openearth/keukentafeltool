require('dotenv-safe').config()
const pkg = require('./package')

module.exports = {
  env: {
    // pass Node env variables to Nuxt env:
    DEFAULT_PROJECTION: process.env.DEFAULT_PROJECTION,
    GEOSERVER_BASE_URL: process.env.GEOSERVER_BASE_URL,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
  mode: 'universal',
  srcDir: 'src/client/',
  generate: {
    dir: 'dist/client/',
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/persist-state', ssr: false },
    { src: '~/plugins/resize-directive', ssr: false },
    { src: '~/plugins/vue-material.js', ssr: true },
    { src: '~/plugins/vue-portal', ssr: true },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
