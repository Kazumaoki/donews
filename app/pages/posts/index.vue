<template>
  <div class="page">

    <PostCardList heading="New arrivals" :posts="$store.state.content.posts.all" :limit="15" />
    <PostCardList heading="おすすめサービス" :posts="$store.state.content.posts.recommendedCategories" :limit="6" />
    <PostCardList heading="おすすめジャンル" :posts="$store.state.content.posts.recommendedTags" :limit="6" />

    <Footer/>
  </div>
</template>

<script>
import PostCardList from '~/components/posts/PostCardList.vue'
import Footer from '~/components/navigations/Footer.vue'

export default {
  components: {
    PostCardList,
    Footer,
  },
  data() {
    return {
      posts: this.$store.state.content.posts.all,
      tagList: this.$store.state.content.tags.all,
      categorieList: this.$store.state.content.categories.all,
      recommendedTagPostList: this.$store.state.content.posts
        .recommendedCategories,
      recommendedCategoriePostList: this.$store.state.content.posts
        .recommendedCategories,
    }
  },
}
</script>

<style lang="scss">
img {
  width: 100%;
  height: auto;
}
</style>
