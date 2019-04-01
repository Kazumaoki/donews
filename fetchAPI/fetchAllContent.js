import axios from 'axios'
import fixPosts from './fixPosts'
import fetchTagsAndCategories from './fetchTagsAndCategories'

// const entrypoint = 'https://carvancl.sakura.ne.jp/test/wp/wp-json/wp/v2/'
const entrypoint = 'http://mojikaku.sakura.ne.jp/donews/wp-json/wp/v2/'
const RecommendedTagsPageId = 7
const RecommendedCategoriesPageId = 9
const PrivacyPolicyID = 108
const TermsOsUseID = 110

const urls = {
  entrypoint: entrypoint,
  allPages: (perPage, nowPage) =>
    `${entrypoint}posts?per_page=${perPage}&page=${nowPage}&_embed`,
  allTags: entrypoint + 'tags',
  recommendedTags: `${entrypoint}pages/${RecommendedTagsPageId}`,
  allCategories: entrypoint + 'categories',
  recommendedCategories: `${entrypoint}pages/${RecommendedCategoriesPageId}`,
  privacyPolicy: `${entrypoint}pages/${PrivacyPolicyID}`,
  termsOfUse: `${entrypoint}pages/${TermsOsUseID}`,
}

class Content {
  constructor(name) {
    this.name = name
    this.data = {} // 整形前
    this.fixedData = {} // 整形後
  }
  async fetchDataFrom(url) {
    const result = await this._executeFetch(url)
    this.data = result.data
  }
  async fetchAndAddDataFrom(url) {
    if (!(this.data instanceof Array)) {
      throw new Error(`=== fetchAndAdd ${this.name}: 配列じゃない`)
      return
    }
    const result = await this._executeFetch(url)
    this.data.push(result.data)
  }

  setFixedData(fixedData) {
    this.fixedData = fixedData
  }

  async _executeFetch(url) {
    return await axios.get(url).catch(err => {
      throw new Error(`=== fetch ${this.name}: データ取得失敗!! ===`)
    })
  }
}

/**
 * "すべてのコンテンツデータを格納したオブジェクトを返すプロミス" を返す
 * (axios.get() はプロミスを返すため)
 * @type Promis Object
 */
const fetchAllContent = async () => {
  console.log('=== fetch all content: START... ===')

  // create posts
  const posts = new Content('posts')
  const perPage = 2
  let nowPage = 1
  let endpointPosts =
    entrypoint + 'posts?per_page=' + perPage + '&page=' + nowPage + '&_embed'
  await posts.fetchDataFrom(urls.allPages(perPage, nowPage))
  let hasMorePosts = true

  while (hasMorePosts) {
    nowPage++
    endpointPosts =
      entrypoint + 'posts?per_page=' + perPage + '&page=' + nowPage + '&_embed'
    try {
      if (posts.data instanceof Array) {
        const result = await axios
          .get(urls.allPages(perPage, nowPage))
          .catch(err => {
            throw new Error(`=== fetch ${this.name}: データ取得失敗!! ===`)
          })
        posts.data.push(...result.data)
      } else {
        throw new Error(`=== fetchAndAdd ${this.name}: 配列じゃない`)
      }
    } catch (error) {
      hasMorePosts = false
    }
  }
  posts.setFixedData({
    status: true,
    data: fixPosts(posts.data),
  })

  // create tags
  const tags = new Content('tags')
  tags.setFixedData({
    status: true,
    data: await fetchTagsAndCategories(urls.allTags, urls.recommendedTags),
  })

  let hasMoreTags = true
  nowPage = 1
  while (hasMoreTags) {
    nowPage++
    try {
      const result = await fetchTagsAndCategories(
        urls.allTags + `?page=${nowPage}`,
        urls.recommendedTags
      )

      if (result.length === 0) {
        hasMoreTags = false
      }

      tags.fixedData.data.push(...result)
    } catch (e) {
      console.log(e)
      console.log(nowPage)
      hasMoreTags = false
    }
  }

  // create categories

  const categories = new Content('categories')
  categories.setFixedData({
    status: true,
    data: await fetchTagsAndCategories(
      urls.allCategories,
      urls.recommendedCategories
    ),
  })

  // console.log(JSON.stringify(categories))

  let hasMoreCategories = true
  nowPage = 1
  while (hasMoreCategories) {
    nowPage++
    try {
      const result = await fetchTagsAndCategories(
        urls.allCategories + `?page=${nowPage}`,
        urls.recommendedCategories
      )

      if (result.length === 0) {
        hasMoreCategories = false
      }

      categories.fixedData.data.push(...result)
    } catch (e) {
      console.log('error has come')
      hasMoreCategories = false
    }
  }

  // ************* add get page script
  const fetchAddPageContent = async (name, url) => {
    const result = await axios.get(url).catch(err => {
      throw new Error(`=== fetch ${name}: データ取得失敗!! ===`)
    })
    return {
      title: result.data.title.rendered,
      body: result.data.content.rendered, // 本文HTML
    }
  }
  const additionalPages = {}
  additionalPages.privacyPolicy = await fetchAddPageContent(
    'privacy policy',
    urls.privacyPolicy
  )
  additionalPages.termsOfUse = await fetchAddPageContent(
    'terms of use',
    urls.termsOfUse
  )
  // ************* add get page script

  console.log('=== fetch all content: SUCCESS!! ===')

  return {
    posts: posts.fixedData,
    tags: {
      status: true,
      data: tags.fixedData.data.map(t => {
        t.url = `/posts/tags/${t.id}`
        return t
      }),
    },
    categories: {
      status: true,
      data: categories.fixedData.data.map(c => {
        c.url = `/posts/categories/${c.id}`
        return c
      }),
    },
    additionalPages,
  }
}

export default fetchAllContent
