<template lang="html">
  <div class="container">
    <h1>Eメールアドレスで新規登録する</h1>
    <form @submit.prevent="signUp">

      <span class="name">メールアドレス</span>
      <span class="input"><input type="email" name="email" v-model="email" required></span>
      <span class="name">パスワード</span>
      <span class="input"><input type="password" name="password" v-model="password" minlength="6" required></span>
      <span class="name">お名前（漢字）</span>
      <span class="input"><input type="text" name="name" v-model="name" required></span>
      <span class="name">お名前（カタカナ）</span>
      <span class="input"><input type="text" name="kana" v-model="kana" required></span>
      <span class="name">電話番号</span>
      <span class="input"><input type="tel" name="phoneNumber" v-model="phoneNumber" required></span>
      <span class="name">所属</span>
      <span class="input"><input type="text" name="belongs" v-model="belongs" required></span>

      <button class="submit" type="submit">登録する</button>
    </form>
  </div>
</template>

<script>
// production mode
const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

export default {
  data() {
    return {
      email: '',
      name: '',
      password: '',
      kana: '',
      phoneNumber: '',
      belongs: '',
    }
  },
  methods: {
    async signUp() {
      //TODO validation
      const user = {
        email: this.email,
        password: this.password,
        name: this.name,
        kana: this.kana,
        phoneNumber: this.phoneNumber,
        belongs: this.belongs,
        userAgent: window.navigator.userAgent,
      }

      try {
        const successCreateUserOnFirebaseAuthentication = await createUserOnFirebaseAuthentication(
          user.email,
          user.password
        )
        await registFirestore(user)
        window.location.href = this.$route.query['requestDocuments']
          ? '/document-request?requestDocuments=true&postId=' +
            this.$route.query['postId']
          : '/my-page'
      } catch (e) {
        window.alert(e)
      }
    },
  },
}

async function createUserOnFirebaseAuthentication(email, password) {
  let doesSuccess = true
  const firebase = require('firebase')
  const errorPettern = {
    'auth/weak-password': 'パスワードが弱すぎます',
    'auth/email-already-in-use': '登録済みのユーザーです',
    'auth/invalid-email': 'メールアドレスの形式が不正です',
    'auth/operation-not-allowed':
      'メールアドレスかパスワードが、許可されていない形式です',
  }
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        return true
      })
      .catch(error => {
        throw new Error(errorPettern[error.code])
      })
  } catch (e) {
    throw e
  }
}

/**
 * FireStore に新しくユーザー情報 1 件を格納する
 * @param userData {Object} ユーザー情報
 *  - state.userDataForDocumentRequest.data.body と同一のスキーマを想定している
 */
async function registFirestore(userData) {
  delete userData.password
  const db = firebase.firestore()
  await db
    .collection('users')
    .doc(userData.email)
    .set(userData)
    .catch(function(error) {
      window.alert(error)
      console.error('Error adding document: ', error)
    })
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.container {
  padding: 1em 0;
  margin: 0 auto;
  width: 90%;
  max-width: 400px;
  h1 {
    padding: 2em 0 1em;
    font-weight: 600;
    font-size: 1.2em;
  }
  .name {
    margin-top: 1em;
    display: block;
    line-height: 2;
    font-weight: 600;
    opacity: 0.6;
  }
  .input {
    display: block;
    input {
      width: 100%;
      appearance: none;
      margin-bottom: 1em;
      padding: 0.5em;
      display: block;
      border: 1px solid $grey3;
      border-radius: 3px;
      background: $white;
      font-size: 16px;
    }
  }

  .submit {
    display: block;
    margin: 3.6em auto 3em;
    border: none;
    line-height: 3.4;
    width: 86vw;
    max-width: 300px;
    border-radius: 3em;
    background: $positive;
    color: $white;
    font-weight: 600;
    letter-spacing: 0.1em;
  }
}
</style>
