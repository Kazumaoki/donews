// 日にち情報JS文字列から読めるものへ変換
function getYMD(date) {
  var dt = new Date(date)
  var y = dt.getFullYear()
  var m = ('00' + (dt.getMonth() + 1)).slice(-2)
  var d = ('00' + dt.getDate()).slice(-2)
  var result = y + '/' + m + '/' + d
  return result
}

export default posts =>
  posts
    .map(post => ({
      id: post.id,
      date: {
        // created: post.date, // 作成日
        created: getYMD(post.date), // 作成日
        modified: getYMD(post.modified), // 修正日
      },
      title: post.title.rendered,
      body: post.content.rendered, // 本文HTML

      excerpt: post.excerpt.rendered || '', // 抜粋(任意)HTML
      url: '/posts/' + post.id, // サイト内URL

      eyeCatch: !('wp:featuredmedia' in post['_embedded'])
        ? ''
        : post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes'][
            // 'large'
            'full'
          ]['source_url'],

      tags:
        post['_embedded']['wp:term'][1].length === 0
          ? [{ id: 0, name: '' }]
          : post['_embedded']['wp:term'][1].map(tag => ({
              id: tag.id,
              name: tag.name,
            })),

      categories:
        post['_embedded']['wp:term'][0].length === 0
          ? [{ id: 0, name: '' }]
          : post['_embedded']['wp:term'][0].map(categorie => ({
              id: categorie.id,
              name: categorie.name,
            })),

      tags:
        post['_embedded']['wp:term'][1].length === 0
          ? [{ id: 0, name: '' }]
          : post['_embedded']['wp:term'][1].map(tag => ({
              id: tag.id,
              name: tag.name,
            })),
    }))
    .filter(post => post.title !== '')
    .sort((p1, p2) => {
      p2.date.created - p1.date.created
    })
