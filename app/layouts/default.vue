<template>
  <div @touchstart="() => {}">

    <nav class="navPC">
      <router-link :to="{ path: '/' }" class="logo">
        <img class="logotype" src="~/assets/img/logo-type-2.png" alt="ドウニュウスのロゴマーク">
      </router-link>
      <div class="links">
        <router-link
        v-for="(r, i) in $store.state.content.navs.main"
        :key="i"
        :to="{ path: r.path }"
        class="linkButton">{{ r.name }}</router-link>
      </div>
    </nav>

    <nav class="navMobile" :class="{active: isNavMobileActive}">
      <router-link :to="{ path: '/' }" class="logo">
        <img
        @click="toggleNavMobile('close')"
        class="logotype" src="~/assets/img/logo-type-2.png" alt="ドウニュウスのロゴマーク">
      </router-link>
      <img
      @click="toggleNavMobile()"
      class="menuButton" src="~/assets/img/bx-grid-small.svg" alt="メニューボタン">
    </nav>

    <nav
    @click="toggleNavMobile()"
    class="navMobileLinks" :class="{active: isNavMobileActive}">
      <router-link
        v-for="(r, i) in $store.state.content.navs.main"
        :key="i"
        :to="{ path: r.path }"
        class="linkButton">{{ r.name }}</router-link>
      <span><img src="~/assets/img/bx-x.svg" alt=""></span>
      <div class="bg"/>
    </nav>

    <nuxt class="mainContent"/>

    <script>
      (function(d) {
        var config = {
          kitId: 'fsp0stz',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);
    </script>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavMobileActive: false,
    }
  },
  methods: {
    toggleNavMobile(isForceClose = null) {
      if (isForceClose === 'close') {
        this.isNavMobileActive = false
        return
      }
      this.isNavMobileActive = !this.isNavMobileActive
    },
  },
  created() {
    /**
    NOTE: firebaseuiがwindowオブジェクトを参照してしまうのでSSRでスキップする必要がある。
     */
    if (!process.browser) return
    // NOTE: クライアント実行時のみ読み込みたいので、require()を利用
    // const firebase = require('firebase')
    // const firebaseui = require('firebaseui')

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
    firebase.initializeApp(config)
  },
}
</script>

<style lang="scss">
@import '~assets/style/common.scss';
:root {
  max-width: $content-max-width;
  margin: 0 auto;
  background: $grey1;
  color: $grey9;
  font-family: source-han-sans-japanese, sans-serif;
}

.navPC,
.navMobile,
.navMobileLinks {
  display: none;
}

@include sm {
  .mainContent {
    margin-top: $header-height-sm;
    padding-top: 1px;
  }
  .navMobile {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height-sm;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background: rgba($white, 0.9);
    backdrop-filter: blur(12px);
    user-select: none;
    z-index: 9999999999999;
    .logo {
      width: 35vw;
      height: auto;
      padding-top: 1.3vw;
      padding-left: 6vw;
    }
    .menuButton {
      padding-right: 3vw;
      width: 15vw;
      opacity: 0.6;
    }
    // NAV OPEN
    &.active {
      .menuButton {
        opacity: 0.2;
      }
    }
  }
  .navMobileLinks {
    position: fixed;
    top: $header-height-sm;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    @include futura;
    font-weight: 600;
    font-size: 16px;
    box-shadow: 0 10px 40vw 0 rgba(0, 0, 0, 0.2);
    z-index: 999999999;
    text-transform: uppercase;
    letter-spacing: 0.1em;

    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 150vh;
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(6px);
      z-index: -1;
    }

    & > *:not(.bg) {
      flex: 0 0 auto;
      width: 50vw;
      height: 50vw;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      background: $grey1;
      color: $grey8;
      &:nth-child(1) {
        border-top: 2px solid $white;
        border-left: 2px solid $white;
        border-right: 2px solid $white;
        border-bottom: 2px solid $white;
      }
      &:nth-child(2) {
        border-top: 2px solid $white;
        border-right: 2px solid $white;
        border-bottom: 2px solid $white;
      }
      &:nth-child(3) {
        border-left: 2px solid $white;
        border-right: 2px solid $white;
        border-bottom: 2px solid $white;
      }
      &:nth-child(4) {
        border-bottom: 2px solid $white;
        border-right: 2px solid $white;
        img {
          width: 1.2em;
          opacity: 0.2;
        }
      }
    }
    // hidden setting
    @include transition-ease-out(1s);
    transition-delay: 0.1s;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-200px);
    &.active {
      @include transition-ease-out(0.5s);
      transition-delay: 0;
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
}

@include md {
  .mainContent {
    margin-top: $header-height;
  }

  .navPC {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    padding-left: $header-height;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background: $white;
    background: rgba($white, 0.9);
    backdrop-filter: blur(12px);
    z-index: 9999999999999;
    .logo {
      padding-top: vw(6);
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: flex-end;
      vertical-align: bottom;
      .logotype {
        width: vw(180);
        opacity: 0.8;
      }
    }
    .linkButton {
      padding: 0.2em 2em 0 1.7em;
      display: inline-block;
      @include futura;
      font-weight: 600;
      line-height: 1;
      vertical-align: bottom;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: $grey8;
      font-size: vw(22);
      @include sm {
        font-size: 1vw;
      }
      @include md {
        font-size: 15px;
      }
      cursor: pointer;
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
      &:last-child {
        padding-right: vw(90);
      }
    }
  }
}

/* nuxt page transition */
.page-enter-active {
  transition: transform 0.6s $ease-out, opacity 1s ease;
  // transition-delay: 0.3s;
}
.page-enter {
  opacity: 0;
  transform: translateY(50px);
}
.page-leave-active {
  transition: all 0.4s $ease-out;
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
