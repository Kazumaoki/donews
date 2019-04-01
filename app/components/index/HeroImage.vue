<template lang="html">
  <div class="heroImage">

    <h1 class="powerWord"><span>SELECT</span><span>YOUR</span><span>VALUE</span></h1>

    <div class="line"/>

    <img
      class="arrow right" src="~/assets/img/heroimage-arrow.svg" alt="前後のトピックへ移動"
      @click="exchangeCenterContents('next')">
    <img
      class="arrow left" src="~/assets/img/heroimage-arrow.svg" alt="前後のトピックへ移動"
      @click="exchangeCenterContents('prev')">

    <router-link
      :to="pickupPost[heroImageStatus].url"
      class="moreButton">VIEW MORE</router-link>

    <router-link
      v-for="(p, i) in pickupPost"
      :key="'heroImage-centerImage' + i"
      :to="p.url"
      class="centerImage"
      :class="{
        center: heroImageStatus === i,
        right: heroImageStatus === (i+1 === pickupPost.length ? 0 : i+1),
        left: heroImageStatus === (i === 0 ? pickupPost.length-1 : i-1)
      }"
      :style="{backgroundImage: `url(${p.eyeCatch})`}"/>

    <div
      v-for="(p, i) in pickupPost"
      :key="'heroImage-caption' + i"
      class="caption"
      :class="{
        center: heroImageStatus === i,
        right: heroImageStatus === (i+1 === pickupPost.length ? 0 : i+1),
        left: heroImageStatus === (i === 0 ? pickupPost.length-1 : i-1)
      }">
        <div class="en">{{p.title}}</div>
        <div class="ja" v-html="p.excerpt"/>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pickupPost: this.$store.state.content.posts.pickup,
      heroImageStatus: 0,
      heroImageLock: false,
      timeoutID: null,
      intervalMilliSecond: 7000,
    }
  },
  methods: {
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async exchangeCenterContents(direction) {
      if (this.heroImageLock) return
      this.heroImageLock = true

      // オートループ処理
      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(
        () => this.exchangeCenterContents('next'),
        this.intervalMilliSecond
      )

      const isNext = direction === 'next'
      const lastNum = this.pickupPost.length - 1
      if (isNext) {
        this.heroImageStatus =
          this.heroImageStatus === lastNum ? 0 : ++this.heroImageStatus
      } else {
        this.heroImageStatus =
          this.heroImageStatus === 0 ? lastNum : --this.heroImageStatus
      }
      await this.timeout(900)
      this.heroImageLock = false
    },
  },

  mounted() {
    // オートループ処理
    this.timeoutID = setTimeout(() => this.exchangeCenterContents('next'), 300)
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';

.heroImage {
  position: relative;
  width: 100vw;
  height: vw(960) - $header-height;
  user-select: none;
  overflow: hidden;
  @include md {
    margin-top: -0.8vw;
  }
  $hero-image-height-sm: 139vw - $header-height-sm;
  @include sm {
    height: $hero-image-height-sm;
  }

  .powerWord {
    padding: 0.1em;
    position: absolute;
    top: vw(227);
    left: 0;
    right: 0;
    bottom: auto;
    font-size: vw(119);
    font-family: paganini, serif;
    font-weight: 900;
    line-height: 1;
    text-align: center;
    z-index: 2;

    color: $accent02;
    background: -webkit-linear-gradient(
      45deg,
      $accent01,
      $accent02
    ); //背景色にグラデーションを指定
    -webkit-background-clip: text; //テキストでくり抜く
    -webkit-text-fill-color: transparent; //くり抜いた部分は背景を表示
    opacity: 0.4;

    span {
      padding: 0 0.31em;
    }
    @include sm {
      display: none;
    }
  }

  .line {
    position: absolute;
    top: vw(504);
    left: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background: $grey2;
    z-index: 2;
    @include sm {
      // top: $hero-image-height-sm / 2;
      display: none;
    }
  }

  .arrow {
    position: absolute;
    top: vw(462);
    left: vw(210);
    width: vw(88);
    height: auto;
    z-index: 9;
    cursor: pointer;
    box-shadow: vw(2) vw(8) vw(30) 0 rgba(0, 0, 0, 0.03);
    opacity: 0.9;
    &.right {
      left: auto;
      right: vw(210);
    }
    &.left {
      transform-origin: center;
      transform: rotate(180deg);
      box-shadow: vw(-2) vw(-8) vw(30) 0 rgba(0, 0, 0, 0.03);
    }
    @include transition-ease-out;
    &:hover {
      filter: invert(1);
    }
    @include sm {
      top: 44vw;
      width: 12vw;
      &.right {
        right: 0;
      }
      &.left {
        left: 0;
      }
    }
  }

  .moreButton {
    position: absolute;
    top: vw(462);
    left: vw(829);
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    width: vw(263);
    height: vw(84);
    background: transparent url('~assets/img/heroimage-center-button.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    color: $grey2;
    font-family: futura-pt, sans-serif;
    font-weight: 600;
    font-size: vw(18);
    @include lg {
      font-size: vw(15);
    }
    letter-spacing: 0.2em;
    box-shadow: vw(2) vw(8) vw(32) 0 rgba(0, 0, 0, 0.25);
    z-index: 7;
    cursor: pointer;
    filter: invert(1) brightness(1.04);
    @include transition-ease-out;
    &:hover {
      filter: invert(0);
    }
    @include sm {
      top: 44vw;
      left: (100vw - 40vw) / 2;
      width: 40vw;
      height: 11.5vw;
      font-size: 13px;
    }
  }

  .centerImage {
    position: absolute;
    top: vw(324);
    left: vw(540);
    width: vw(840);
    height: vw(360);
    background: grey;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 0 7vw 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 5;
    opacity: 0;
    pointer-events: none;
    transition: transform $ease-out 1.5s, opacity ease 1.2s;
    &.center {
      z-index: 6;
      opacity: 1;
      pointer-events: auto;
      transition-delay: 0.3s;
    }
    filter: brightness(86%) saturate(116%);
    &.right {
      transform: translateX(21vw);
    }
    &.left {
      transform: translateX(-21vw);
    }
    @include sm {
      top: 7vw;
      left: 6.5vw;
      width: 87vw;
      height: 84vw;
    }
  }

  .caption {
    position: absolute;
    top: vw(688);
    left: vw(540);
    width: vw(840);
    line-height: 1;
    letter-spacing: 0.1em;
    opacity: 0;
    pointer-events: none;
    z-index: 4;
    transition: all ease 0.8s;
    transition-delay: 0.1s;
    &.center {
      opacity: 1;
      pointer-events: auto;
      transition: transform $ease-out 1.3s, opacity ease 1.4s;
      transition-delay: 1s;
      z-index: 5;
    }
    &.right {
      transform: translateX(5vw);
    }
    &.left {
      transform: translateX(-5vw);
    }
    .en {
      padding: 1em 0 0;
      font-size: 1.2rem;
      line-height: 1.4;
      font-weight: 600;
      color: $grey9;
    }
    .ja {
      padding-top: 0.6em;
      font-size: 0.9rem;
      font-family: sans-serif;
      color: $grey7;
      line-height: 1.5;
      height: calc(1.4em * 2 + 0.6em);
      @include md {
        font-size: 0.85em;
      }
    }
    @include sm {
      top: 93vw;
      left: 7vw;
      width: 86vw;
    }
  }
} // .heroImage
</style>
