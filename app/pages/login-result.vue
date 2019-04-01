<template lang="html">
<section>

</section>
</template>

<script>
// import firebase from 'firebase'
// production mode
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

export default {
  data() {
    return {
      type: this.$route.query.type, // "social" or "email"
      nextUrl: this.$route.query.requestDocuments
        ? '/document-request?postId=' + this.$route.query.postId
        : '/my-page',
      loginUser: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(loginUser => {
      if (loginUser === null) {
        this.nextUrl = '/my-page'
        this.$router.push('/my-page')
      } else {
        this.loginUser = loginUser
      }
    })
  },

  watch: {
    /**
     * Firebase Authentication を利用したログインを監視し，
     * ログイン後に FireStore にユーザー情報の格納を行う。
     * FireStore への情報の格納後，次ページにリダイレクトする。
     */
    loginUser(val, oldVal) {
      if (val === null) {
        return false
      }

      // メールアドレス認証の場合，サインアップ時に FireStore に情報を格納済み
      // ソーシャル認証の場合，FirebaseUI を脂溶性ているため FireStore に情報が未格納
      const hasRegistoredToFireStore = this.type === 'email'
      if (hasRegistoredToFireStore) {
        // window.location.href = this.nextUrl
        this.$router.push(this.nextUrl)
        return false
      }

      const userData = {
        email: val.email,
        name: 'ソーシャルログインのため取得できません',
        kana: 'ソーシャルログインのため取得できません',
        phoneNumber: 'ソーシャルログインのため取得できません',
        belongs: 'ソーシャルログインのため取得できません',
        userAgent: window.navigator.userAgent,
      }

      firebase
        .firestore()
        .collection('users')
        .doc(userData.email)
        .set({
          email: val.email,
          name: 'ソーシャルログインのため取得できません',
          kana: 'ソーシャルログインのため取得できません',
          phoneNumber: 'ソーシャルログインのため取得できません',
          belongs: 'ソーシャルログインのため取得できません',
          userAgent: window.navigator.userAgent,
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })

      // window.location.href = this.nextUrl
      this.$router.push(this.nextUrl)
    },
  },
}
</script>

<style lang="css" scoped>
</style>
