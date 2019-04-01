<template lang="html">
  <section class="post-list">
    <div>
      <h2>新着投稿一覧</h2>
      <PostCard
        v-for="(post, i) in postList"
        :key="i"
        :post="post"/>
    </div>
  </section>
</template>

<script>
import PostCard from '~/components/posts/PostCard.vue'
export default {
  props: {
    postList: { type: Array },
  },
  components: { PostCard },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.post-list {
  border: 1px solid red;
}
</style>
