<template lang="html">
  <div class="shareButtons">

    <div class="button facebook" @click="facebookClick">
      <img src="~/assets/img/facebook-logo-96.png" >
    </div>
    <div class="button twitter" @click="twitterClick">
      <img src="~/assets/img/twitter-logo-96.png">
    </div>
    <div class="button pocket" @click="pocketClick">
      <img src="~/assets/img/pocket-logo-96.png">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
  },
  data() {
    return {
      url: location.href,
    }
  },
  methods: {
    facebookClick() {
      const facebookUrl = `http://www.facebook.com/share.php?u=${this.url}`
      window.open(facebookUrl)
    },
    twitterClick() {
      const twitterUrl = `http://twiter.com/share?url=${this.url}&text=${
        this.title
      }`
      window.open(twitterUrl)
    },
    pocketClick() {
      const pocketUrl = `http://getpocket.com/edit?url=${this.url}&title=${
        this.title
      }`
      window.open(pocketUrl)
    },
  },
}
</script>

<style lang="scss" scoped>
.shareButtons {
  margin: 0 auto;
  width: 100%;
  height: 2.3em;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgb(102, 25, 129);
  .button {
    width: calc(100% / 3);
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      display: block;
      width: 1.2em;
      height: auto;
    }
    filter: sepia(0.3);
    &:hover {
      filter: brightness(1.1);
    }
    &.twitter {
      background: #1dcaff;
    }
    &.facebook {
      background: #3b5998;
    }
    &.pocket {
      background: #ee4056;
    }
  }
}
</style>
