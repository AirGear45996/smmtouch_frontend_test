export default {
  ssr: false,

  head: {
    title: 'SMMTOUCH_MyGame',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'normalize.css/normalize.css',
    '@assets/main.scss'
  ],

  plugins: [],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'http://jservice.io'
  },

  build: {}
}
