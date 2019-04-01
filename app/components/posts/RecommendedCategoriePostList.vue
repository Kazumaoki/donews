<template lang="html">
  <section class="reccomended-categorie-post-list">
    <h1>おすすめカテゴリの投稿だよ</h1>
    <PostCard
    v-for="(p, i) in recommendedCategoriePostList"
    :key="i"
    :post="p" />
  </section>
</template>

<script>
import PostCard from '~/components/posts/PostCard.vue'
export default {
  components: {
    PostCard,
  },
  props: {
    recommendedCategoriePostList: { type: Array },
  },
}
</script>

<style lang="css" scoped>
.reccomended-categorie-post-list {
  border: 1px solid red;
}
</style>
