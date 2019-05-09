<template>
  <div class="page">
    <HeroImage />
    <PostCardList
      heading="新着記事"
      :limit="9"
      :posts="$store.state.content.posts.all"
    />
    <PostCardList
      heading="おすすめサービス"
      :limit="6"
      :posts="$store.state.content.posts.recommendedCategories"
    />

    <footer />
  </div>
</template>

<script>
import HeroImage from '~/components/index/HeroImage.vue'
import PostCardList from '~/components/posts/PostCardList.vue'
import Footer from '~/components/navigations/Footer.vue'
export default {
  components: {
    HeroImage,
    PostCardList,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.page {
  @include md {
    margin-top: 0;
  }
}
</style>
