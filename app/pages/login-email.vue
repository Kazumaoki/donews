<template lang="html">
  <div class="page">
    <div class="container">
      <h1>Eメールアドレスでログインする</h1>
      <form @submit.prevent="login">

        <span class="name">メールアドレス</span>
        <span class="input"><input type="email" name="email" v-model="email" required></span>
        <span class="name">パスワード</span>
        <span class="input"><input type="password" name="password" v-model="password" minlength="6" required></span>

        <button class="submit" type="submit">ログイン</button>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/navigations/Footer.vue'
const firebase = require('firebase/app')

export default {
  components: {
    Footer,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
        // ログイン情報は firebase が保持する
        // -> 自分でログイン情報を保持するロジックを記述つする必要はない
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(function(error) {
            throw new Error(error.code, error.message)
          })

        this.$router.push('/my-page')
      } catch (e) {
        console.log(e)
        window.alert('ご登録情報が見つかりませんでした。')
      }
    },
  },
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
