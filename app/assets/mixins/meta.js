export default {
  head() {
    const isArticle = this.meta.title !== process.env.siteTitle
    const type = isArticle ? 'article' : 'website'

    let title = this.meta.title
    title = title
      ? title + ' | ' + process.env.siteTitle
      : process.env.siteTitle

    let description = this.meta.description || process.env.description
    description = description.replace('<p>', '').replace('</p>', '')

    let ogImage = this.meta.image || process.env.ogImageDefault

    let url = this.meta.url || process.env.domain

    return {
      title: title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        { hid: 'og:type', property: 'og:type', content: type },
        { hid: 'og:title', property: 'og:title', content: title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:image', property: 'og:image', content: ogImage },
        { hid: 'og:site_name', property: 'og:site_name', content: title },

        // twitter
        { hid: 'twitter:site', property: 'twitter:site', content: url },
        { hid: 'twitter:title', property: 'twitter:title', content: title },
        { hid: 'twitter:image', property: 'twitter:image', content: ogImage },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: description,
        },
      ],
    }
  },
}
