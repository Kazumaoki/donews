export default {
  head() {
    let metaDescription = this.meta.description
    metaDescription = metaDescription.replace('<p>', '').replace('</p>', '')

    let metaTitle = this.meta.title
    metaTitle = metaTitle
      ? metaTitle + ' | ' + process.env.siteTitle
      : process.env.siteTitle
    return {
      title: metaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: metaDescription || '',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: metaTitle },
        {
          hid: 'og:description',
          property: 'og:description',
          content: metaDescription || '',
        },
        { hid: 'og:url', property: 'og:url', content: this.meta.url },
        // { hid: 'og:image', property: 'og:image', content: this.meta.image },
      ],
    }
  },
}
