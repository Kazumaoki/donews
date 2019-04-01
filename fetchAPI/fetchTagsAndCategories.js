import axios from 'axios'

/**
 * @param {Object}
 * @param {string} { endpointOfAll } タグ/カテゴリを全て取得するためのエンドポイント
 * @param {string} { endpointOfRecommended } おすすめのタグ/カテゴリを取得するためのエンドポイント
 * @param {number} { mode } タグを取得するかカテゴリを取得するかを判断するためのフラグ
 *  0: カテゴリを取得します
 *  1: タグを取得します
 */
export default async (endpointOfAll, endpointOfRecommended, mode) => {
  if (mode === 0) {
    state.categories.status = true
  } else if (mode === 1) {
    state.tags.status = true
  }
  // COT: Categorie Or Tag
  const allCOTWpResponse = await axios.get(endpointOfAll).catch(err => {
    if (mode === 0) {
      state.categories.status = false
    } else if (mode === 1) {
      state.tags.status = false
    }
    console.log(err)
  })
  const recommendedCOTWpResponse = await axios
    .get(endpointOfRecommended)
    .catch(err => {
      if (mode === 0) {
        state.categories.status = false
      } else if (mode === 1) {
        state.tags.status = false
      }
      console.log(err)
    })

  return generateTags(allCOTWpResponse.data, recommendedCOTWpResponse.data)
}

const generateTags = (allTagWpResponse, recommendedTagsWpResponse) => {
  //  ====================
  //        便利関数
  //  ====================
  const generateRecommendedTags = json => {
    const contentHTML = json.content.rendered
    const removeElements = ['<p>', '</p>', '<br />', '\n'] //除去したいタグや要素
    const wordSeparator = '#$#$#$' // 関数内で使う区切り文字。タグ名と被らなそうな無意味な文字

    // WordPress の投稿コンテンツHTML を wordSeparator 区切りの文字列に変換する
    const tagRemovedString = removeElements.reduce((content, deleteElement) => {
      return content.replace(new RegExp(deleteElement, 'g'), wordSeparator)
    }, contentHTML)

    return tagRemovedString
      .split(wordSeparator) // wordSeparator ごとに区切って配列化
      .filter(s => s !== '') // 空文字の要素を除去
      .map(t => (isNaN(t) ? { id: '', name: t } : { id: Number(t), name: '' }))
  }

  const equals = (tagA, tagB) => {
    if (tagA.id === tagB.id) {
      return true
    }
    if (tagA.name !== undefined || tagB.name !== undefined) {
      return tagA.name.trim() === tagB.name.trim()
    }
    return false
  }

  //  =========================
  //        処理はここから
  //  =========================

  const recommendedTags = generateRecommendedTags(recommendedTagsWpResponse)

  return allTagWpResponse.map(tag => ({
    id: tag.id,
    name: tag.name,
    isRecommended: recommendedTags.some(t => equals(tag, t)) ? true : false,
  }))
}
