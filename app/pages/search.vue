<template lang="html">
  <div class="page search">

    <section class="section categories">
      <h1 class="section-heading">サービスから探す</h1>
      <div class="link-container">
        <div class="recommended">
          <h3 class="title">おすすめのサービス</h3>
          <div>
            <router-link
            v-for="(target, i) in $store.state.content.categories.recommended" :key="i"
            class="button" :to="target.url">{{target.name}}</router-link>
          </div>
        </div>
        <div class="all">
          <h3 class="title">サービス一覧</h3>
          <div>
            <router-link
            v-for="(target, i) in $store.state.content.categories.all" :key="i"
            class="button" :to="target.url">{{target.name}}</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="section tags">
      <h1 class="section-heading">ジャンルから探す</h1>
      <div class="link-container">
        <div class="recommended">
          <h3 class="title">おすすめのジャンル</h3>
          <div>
            <router-link
            v-for="(target, i) in $store.state.content.tags.recommended" :key="i"
            class="button" :to="target.url">{{target.name}}</router-link>
          </div>
        </div>
        <div class="all">
          <h3 class="title">ジャンル一覧</h3>
          <div>
            <router-link
            v-for="(target, i) in $store.state.content.tags.all" :key="i"
            class="button" :to="target.url">{{target.name}}</router-link>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
  </div>
</template>

<script>
import Footer from '~/components/navigations/Footer.vue'
export default {
  components: {
    Footer,
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/common.scss';

.section {
  .title {
    font-size: 0.9em;
    font-weight: 600;
    padding: 1.3em 0.4em 2em;
    color: $grey7;
  }
}

.categories,
.tags {
  .recommended,
  .all {
    padding-top: 1em;
    @include sm {
      padding-top: 0;
      padding-bottom: 0.4em;
    }
  }
  .link-container {
    padding: 0 1em;
    margin-top: -0.7em;
    @include md {
      margin-top: -1.1em;
    }
  }
  .button {
    margin: 0 0 0.4em 0.4em;
    padding: 0.25em 1.2em 0.38em;
    display: inline-block;
    font-size: 0.9em;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: $grey9;
    background: $grey1;
    border: 1px solid $grey2;
    border-radius: 1.5em;
    background: $white;
    line-height: 2;
    @include transition-ease-out;
    &:hover {
      background: $grey9;
      color: $grey1;
    }
  }
}
</style>
