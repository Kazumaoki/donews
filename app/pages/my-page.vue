<template lang="html">
  <div class="page">

    <div
      v-if="requestDocuments === 'true' && !$store.state.loginUser.status"
      class="login-notice">
      資料請求にはログインが必要です。以下よりサインアップまたはログインをお願いいたします。
    </div>

    <div class="section">
      <transition name="page">
        <div class="pending" v-if="!checkedFirebaseAuth">
          <p>laoding</p>
        </div>

        <FirebaseAuthUI
        v-else-if="!$store.state.loginUser.status"
        :requestDocuments="requestDocuments"
        :postId="postId"
        />

        <div v-else>
          <h1 class="section-heading">MY PAGE</h1>
          <p class="notice">以下の情報でログインしています。</p>
          <div class="user-data">
            <p class="user-data-title">E-mail</p>
            <p>{{$store.state.userDataForDocumentRequest.data.body.email}}</p>

            <!-- loginType === 'email' の場合以下も表示 -->
            <div v-if="$store.state.userDataForDocumentRequest.data.loginType === 'email'">
              <p class="user-data-title">お名前</p>
              <p>{{$store.state.userDataForDocumentRequest.data.body.name}}</p>
              <p class="user-data-title">送りかな</p>
              <p>{{$store.state.userDataForDocumentRequest.data.body.kana}}</p>
              <p class="user-data-title">電話番号</p>
              <p>{{$store.state.userDataForDocumentRequest.data.body.phoneNumber}}</p>
              <p class="user-data-title">所属</p>
              <p>{{$store.state.userDataForDocumentRequest.data.body.belongs}}</p>
            </div>

          </div>
          <div class="logOutButton" v-on:click="logOut">ログアウト</div>
        </div>
      </transition>

    </div>

    <Footer/>
  </div>
</template>

<script>
// production mode
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

import FirebaseAuthUI from '~/components/contacts/FirebaseAuthUI.vue'
import Footer from '~/components/navigations/Footer.vue'
export default {
  components: {
    FirebaseAuthUI,
    Footer,
  },

  data() {
    return {
      checkedFirebaseAuth: false,
      requestDocuments: this.$route.query['requestDocuments'] || 'false',
      postId: this.$route.query['postId'] || '',
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(result => {
          this.$store.commit('logOut')
        })
        .then(() => {
          this.$router.go('/my-page')
        })
        .catch(error => {
          console.dir(error)
        })
    },
  },
  created() {
    this.checkedFirebaseAuth = false
    firebase.auth().onAuthStateChanged(loginUser => {
      this.$store.commit('setLoginUser', loginUser)
      this.checkedFirebaseAuth = true
    })
  },
  watch: {
    loginUser(val, oldVal) {
      if (val === null) {
        return false
      }

      this.checkedFirebaseAuth = false
      fetchUserInFireStore(this.$store.state.loginUser)
        .then(userInFireStore => {
          if (!userInFireStore) {
            throw new Error('expects user in firestore, but no user.')
          }
          this.$store.commit('setLoginUser', userInFireStore)
          this.checkedFirebaseAuth = true
        })
        .catch(error => {
          console.log(error)
          this.checkedFirebaseAuth = true
        })
    },
  },
}

/**
 * FireStore に存在するユーザー情報について，メールアドレスを元に照会する
 * @param email {string} ユーザーのメールアドレス
 *    FireStore 内のユーザー情報は，メールアドレスをキーにして管理している。
 * @return ユーザー情報
 *    - state.userDataForDocumentRequest.data.body と同一のスキーマを持つ
 *    - 引数のメールアドレスと一致するユーザー情報がない場合は，null を返す
 */
async function fetchUserInFireStore(loginUser) {
  const email = loginUser ? loginUser.data.email : ''
  const doc = firebase
    .firestore()
    .collection('users')
    .doc(email)
    .get()
    .catch(function(error) {
      console.log('Error getting documents: ', error)
    })

  return doc.exists ? doc.data() : null
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.pending {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: $grey7;
  background: $grey1;
  font-size: 500;
  @include futura;
  font-size: 15px;
}

.login-notice {
  padding: 1.8em;
  background: $positive;
  color: $white;
  font-weight: 700;
  display: flex;
  line-height: 1.6;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
}

.user-data {
  padding: 1em;
  p {
    padding: 0.7em 0 0em;
  }
  .user-data-title {
    font-weight: 600;
    opacity: 0.3;
  }
}

.logOutButton {
  margin-top: 3.5em;
  text-align: center;
  width: 240px;
  padding: 1em 2em 1.2em;
  background: $grey7;
  color: $grey3;
  cursor: pointer;
}

p.notice {
  color: $grey7;
  font-size: 0.9em;
  line-height: 3;
}
</style>
