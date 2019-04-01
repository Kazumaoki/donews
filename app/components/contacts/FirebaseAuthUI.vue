<template>
  <div class="firebaseAuthUI">
    <p class="notice">DoNEWSは以下のソーシャルサービスによるログインに対応しています。</p>
    <div class="useFirebase">
      <div id="firebaseui-auth-container"></div>
      <div id="loader"></div>
    </div>
    <div class="useEmail">
      <span @click="useEmailSighUp">Eメールで新規登録する</span>
      <span @click="useEmailLogIn">Eメールでログインする</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    requestDocuments: { type: String },
    postId: { type: String },
  },
  methods: {
    useEmailLogIn() {
      // TODO: メルアドで登録済みのかたがログインするように
      this.$router.push('/login-email')
    },
    useEmailSighUp() {
      const to =
        this.$props.requestDocuments == 'true'
          ? '/sign-up?requestDocuments=true&postId=' + this.$props.postId
          : '/sign-up'
      this.$router.push(to)
    },
  },
  data() {
    let nextUrl = ''
    if (this.$props.requestDocuments == 'true') {
      nextUrl =
        '/login-result?type=social&requestDocuments=true&postId=' +
        this.$props.postId
    } else {
      nextUrl = '/login-result?type=social'
    }

    return {
      nextUrl,
    }
  },
  mounted() {
    // production mode
    const firebase = require('firebase/app')
    require('firebase/auth')
    const firebaseui = require('firebaseui')

    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyB6Uuy1eQbc6lxVJsVpa38-01qkcSKS-nc',
      authDomain: 'mojikaku-donews.firebaseapp.com',
      databaseURL: 'https://mojikaku-donews.firebaseio.com',
      projectId: 'mojikaku-donews',
      storageBucket: 'mojikaku-donews.appspot.com',
      messagingSenderId: '736457942865',
    }
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config)
    }

    // Initialize the FirebaseUI Widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth())

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none'
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      // signInSuccessUrl: '<url-to-redirect-to-on-success>',

      // signInSuccessUrl: this.$props['redirectUrl'],
      signInSuccessUrl: this.nextUrl,

      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // {
        //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   requireDisplayName: false,
        // },
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      tosUrl: '/terms-of-use',
      // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>'
      privacyPolicyUrl: '/privacy-policy',
    }

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
    // console.dir(ui)
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.notice {
  padding: 2em 1em 0;
  text-align: center;
  line-height: 1.6;
  color: $grey7;
  font-size: 0.8em;
}
.firebaseAuthUI {
  padding: 3em 1em 2em;
  @include sm {
    padding: 2em 1em 1em;
  }
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
  min-height: 50vh;
  // border: 1px solid red;
  .useFirebase {
    padding: 3em 0 1em;
  }
  .useEmail {
    padding: 1em 0 2em;
    span {
      margin: 1em auto;
      width: 260px;
      text-align: center;
      padding: 1em 2em 1.2em;
      display: block;
      line-height: 1;
      border-radius: 2px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 0.9em;
      background: $positive;
      cursor: pointer;
      &:nth-child(2) {
        background: $accent01;
      }
    }
  }
}
</style>
