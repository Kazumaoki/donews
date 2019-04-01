<template lang="html">
  <section class="section post-card-list">
    <h1 class="section-heading">{{ heading }}</h1>
    <div class="card-container">
      <PostCard
      v-for="(p, i) in posts.slice(0, limit)"
      :key="i"
      :post="p" />
    </div>
  </section>
</template>

<script>
import PostCard from '~/components/posts/PostCard.vue'
export default {
  components: {
    PostCard,
  },
  props: {
    heading: { type: String, default: 'Section Heading' },
    posts: { type: Array },
    limit: { type: Number, default: 3 },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.post-card-list {
}
</style>
