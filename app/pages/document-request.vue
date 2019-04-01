<template lang="html">
  <div class="page">
    <section class="section">
      <h1 class="section-heading">以下の内容を資料を請求します。</h1>

      <p class="notice">ご登録いただいた以下のメールアドレスに、担当者よりご連絡をいたします。</p>
      <p class="email">{{body.email}}</p>

      <p class="notice">請求するストーリー</p>
      <p class="entryTitle">{{append.entryTitle}}</p>

      <div class="requestButton" @click="sendSlack()"><span>資料請求をする</span></div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/navigations/Footer.vue'
import axios from 'axios'
// import DocumentRequestConfirm from '~/components/contacts/DocumentRequestConfirm'

// production mode
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

export default {
  components: {
    // DocumentRequestConfirm,
    Footer,
  },
  data() {
    //TODO クエリストリングに postId がない場合の処理が必要
    if (!this.$route.query['postId']) {
      this.$router.go('/')
      return
    }

    const readingPost = this.$store.state.content.posts.all.find(
      p => p.id == this.$route.query['postId']
    )
    // console.log(readingPost)

    // console.log('loginUser', this.$store.state.loginUser)

    return {
      loginType: 'social', // 'email' or 'social'
      body: {
        email: '',
        phoneNumber: 'ソーシャルログインを利用したため未記入',
        name: 'ソーシャルログインを利用したため未記入',
        kana: 'ソーシャルログインを利用したため未記入',
        belongs: 'ソーシャルログインを利用したため未記入',
      },
      append: {
        entryTitle: readingPost.title,
        entryTags: readingPost.tags.map(t => t.name).join(', '),
        entryCategories: readingPost.categories.map(t => t.name).join(', '),
        userAgent: '',
        sendDate: new Date(),
      },
    }
  },
  mounted: async function() {
    firebase.auth().onAuthStateChanged(loginUser => {
      const isLogin = loginUser !== null
      if (!isLogin) {
        this.$router.push('/my-page')
      }

      fetchUserInFireStore(firebase, loginUser.email).then(userInFireStore => {
        if (!userInFireStore) {
          return false
        }
        const body = this.body
        Object.keys(body)
          .filter(key => !!userInFireStore[key])
          .forEach(key => {
            body[key] = userInFireStore[key]
          })

        // NOTE: store.commit('setUserDataForDocumentRequest'
        // プロジェクトファイル内にどこにもなかったので
        // 追記してみた。ここで合ってる気がするんだが・・・
        this.$store.commit('setUserDataForDocumentRequest', body)
      })
      this.append.userAgent = window.navigator.userAgent
    })
  },

  methods: {
    sendSlack() {
      const url =
        'https://hooks.slack.com/services/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'
      let fixedText01 = JSON.stringify({ ...this.body, ...this.append })
        .replace('{', '')
        .replace('}', '')
      let fixedText02 = fixedText01
        .replace(`","`, `"\n\n"`)
        .replace(`":"`, `"\n"`)
      while (fixedText01 !== fixedText02) {
        fixedText01 = fixedText01
          .replace(`","`, `"\n\n"`)
          .replace(`":"`, `"\n"`)
        fixedText02 = fixedText02
          .replace(`","`, `"\n\n"`)
          .replace(`":"`, `"\n"`)
      }
      axios
        .post(
          url,
          JSON.stringify({
            // channel: 'test',
            username: 'DoNEWS request',
            // text: fixedText02,
            attachments: [
              {
                fallback: 'DoNEWS request',
                pretext: '資料請求を受け付けました。',
                color: '#56be83',
                fields: [
                  {
                    title: String(getYMD(this.append.sendDate)),
                    value: fixedText02,
                  },
                ],
              },
            ],
          })
        )
        .then(() => this.$router.push('/thx'))
    },
  },
}

async function fetchUserInFireStore(firebase, email) {
  const db = firebase.firestore()
  const preGet = db.collection('users').doc(email)
  const doc = await preGet.get().catch(function(error) {
    console.log('Error getting documents: ', error)
  })

  if (doc.exists) {
    return doc.data()
  }

  return null
}

// 日にち情報JS文字列から読めるものへ変換
function getYMD(date) {
  var dt = new Date(date)
  var y = dt.getFullYear()
  var m = ('00' + (dt.getMonth() + 1)).slice(-2)
  var d = ('00' + dt.getDate()).slice(-2)
  var result = y + '/' + m + '/' + d
  return result
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';

.page {
  .title {
    font-weight: 600;
    font-size: 1.1em;
    letter-spacing: 0.1em;
    line-height: 1.6;
  }

  p {
    line-height: 1.7;
    color: $grey8;
  }

  .notice {
    padding: 2em 0 1em;
    opacity: 0.6;
    font-weight: 500;
  }

  .email {
    padding: 0.4em 1em;
    border: 1px solid $grey2;
    display: inline-block;
    border-radius: 3px;
  }

  .entryTitle {
    margin-bottom: 5em;
    padding: 1em;
    font-weight: 500;
    font-size: 1em;
    line-height: 1.8;
    background: $white;
  }
}

.requestButton {
  position: relative;
  margin: 0 auto 6.5vw;
  width: 80vw;
  max-width: 460px;
  height: 3.4em;
  @include sm {
    margin-bottom: 8.2vw;
    height: 2.9em;
  }
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: $positive;
  background: linear-gradient(22deg, $positive, rgb(116, 204, 136));
  border-radius: 3em;
  box-shadow: 0 4px 10px 0 rgba(47, 105, 82, 0.13);
  color: $white;
  cursor: pointer;
  @include transition-ease-out;
  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 8px 24px 0 rgba(33, 94, 70, 0.2);
  }
  span {
    font-weight: 700;
    position: relative;
    bottom: 0.04em;
    letter-spacing: 0.1em;
  }
}
</style>
