import fetchAllContent from './fetchAPI/fetchAllContent.js'

const domain = 'https://do-news.jp'
const siteTitle = 'DoNEWS ドウニュウ事例で探すメディア'
const description = `DoNEWS（ドーニュース）は、ツールやサービス導入後のストーリーを掲載しています。生の導入ストーリーを通じて、ツールやサービスを比較検討し、資料請求することができます。`
const ogImageDefault = domain + '/og-image.jpg'

const nuxtConfig = {
  mode: 'spa',
  srcDir: 'app',
  /*
   ** Headers of the page
   */
  head: {
    title: siteTitle,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      // OGP

      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: siteTitle,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: siteTitle,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      { hid: 'og:url', property: 'og:url', content: domain },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: ogImageDefault,
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', property: 'twitter:site', content: domain },
      { hid: 'twitter:title', property: 'twitter:title', content: siteTitle },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: ogImageDefault,
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: description,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
      {
        rel: 'shortcut icon',
        type: 'image/vnd.microsoft.icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      { rel: 'apple-touch-startup-image', href: '/apple-touch-icon.png' },
    ],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      // config.performance = config.performance || {}
      // config.performance.maxEntrypointSize = 1200 * 1024 * 1024
      // config.performance.maxAssetSize = 700 * 1024 * 1024
      if (isDev && isClient) {
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
   ** Read axios module automaticaly
   */
  css: [`~assets/style/myreset.scss`, 'firebaseui/dist/firebaseui.css'],
}

export default async () => {
  const content = await fetchAllContent()

  const postRoute = content.posts.data.map(p => `/posts/${p.id}`)
  const categorieRoute = content.categories.data.map(
    p => `/posts/categories/${p.id}`
  )
  const tagRoute = content.tags.data.map(p => `/posts/tags/${p.id}`)

  const routes = [...postRoute, ...categorieRoute, ...tagRoute]

  return {
    ...nuxtConfig,
    env: {
      content,
      siteTitle,
      domain,
      description,
      ogImageDefault,
    },
    generate: {
      routes,
    },
  }
}
