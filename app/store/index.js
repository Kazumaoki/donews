import Vuex from 'vuex'
// production mode
const firebase = require('firebase/app')
require('firebase/auth')

// WP から取得したすべての情報
const content = process.env.content

const tags = {
  all: content.tags.data
    // アンダーバーから始まる運営管理用のカテゴリを削除し、正順にソート。
    .filter(value => value.name.indexOf('_') === -1)
    .sort(),
  recommended: content.tags.data.filter(value => value.isRecommended).sort(),
}

const categories = {
  all: content.categories.data
    // アンダーバーから始まる運営管理用のカテゴリを削除し、正順にソート。
    .filter(value => value.name.indexOf('_') === -1)
    .sort(),
  recommended: content.categories.data
    .filter(value => value.isRecommended)
    .sort(),
}

const posts = {
  all: content.posts.data,
  newArrival: content.posts.data.slice(0, 9),
  pickup: content.posts.data.filter(post =>
    post.categories.some(c => c.name === '_ピックアップ投稿')
  ),
  recommended: content.posts.data.filter(post =>
    post.categories.some(c => c.name === '_おすすめ投稿')
  ),
  recommendedCategories: content.posts.data.filter(p =>
    p.categories.some(c => categories.recommended.some(rc => rc.id === c.id))
  ),
  recommendedTags: content.posts.data.filter(p =>
    p.tags.some(c => tags.recommended.some(rc => rc.id === c.id))
  ),
}

const navs = {
  main: [
    { path: '/posts', name: '記事一覧' },
    { path: '/search', name: '事例を探す' },
    { path: '/my-page', name: 'マイページ' },
  ],
  sub: [
    { path: '/privacy-policy', name: 'プライバシーポリシー' },
    { path: '/terms-of-use', name: '利用規約' },
  ],
}

const loginUserInitial = {
  // ログイン中のユーザーの情報
  status: false,
  data: {},
}

const userDataForDocumentRequestInitial = {
  // 資料請求申し込み時に送信する情報
  status: false,
  data: {
    // お客様の希望により，ソーシャルログインではメールアドレスのみを保持するのに対して，
    // メールアドレス認証では，名前・ふりがな・電話番号・所属を保持することとなった。
    // そのため，
    //  1. loginType によってログイン方式を区別している。
    //  2. FireStore に格納するデータ形式を統一するため，メールアドレス認証でのみ使用するデータは
    //     「ソーシャルログインを利用したため未記入」との初期値を持たせた。
    loginType: 'social', // 'email' or 'social'
    body: {
      email: '',
      // password: '',
      name: 'ソーシャルログインを利用したため未記入',
      kana: 'ソーシャルログインを利用したため未記入',
      phoneNumber: 'ソーシャルログインを利用したため未記入',
      belongs: 'ソーシャルログインを利用したため未記入',
      userAgent: '',
    },
    append: {
      entryTitle: '',
      entryTags: '',
      entryCategories: '',
      userAgent: '',
      sendDate: '',
    },
  },
}

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      content: {
        tags,
        categories,
        posts,
        navs,
        additionalPages: content.additionalPages,
      },
      loginUser: loginUserInitial,
      userDataForDocumentRequest: userDataForDocumentRequestInitial,
    }),

    mutations: {
      getUserData(state) {
        const user = firebase.auth().currentUser
        // firebase.auth().onAuthStateChanged(user => {
        // NOTE: 開発確認用
        console.log('user : ' + user)
        if (user) {
          console.log('login now')
          state.loginUser.status = true
          state.loginUser.data.mail = user.email || ''
        } else {
          console.log('do not longin')
        }
        // })
      },
      // ログイン中のユーザー情報を state に格納する
      // setLoginUser(state, { email, userAgent }) {
      setLoginUser(state, loginUser) {
        if (!loginUser) return
        const email = loginUser.email || ''
        const userAgent = loginUser.userAgent || ''
        if (!email) return
        state.loginUser.status = true
        state.loginUser.data.mail = email || ''
        this.commit('setUserDataForDocumentRequest', { email, userAgent })
      },

      setUserDataForDocumentRequest(state, payload) {
        const userData = state.userDataForDocumentRequest.data.body

        Object.keys(payload)
          .filter(key => key in userData)
          .forEach(key => {
            userData[key] = payload[key]
          })
        state.userDataForDocumentRequest.status = true
      },

      setUserDataForDocumentRequestAppend(state, payload) {
        state.userDataForDocumentRequest.data.append = payload
      },

      setUserToMailAuthentication(state) {
        state.userDataForDocumentRequest.data.loginType = 'email'
      },

      logOut(state) {
        //TODO 'ソーシャルログインを利用したため未記入' に忘れずに戻すこと
        state.loginUser = loginUserInitial
        state.userDataForDocumentRequest = userDataForDocumentRequestInitial
      },
    },
  })
}

export default createStore
