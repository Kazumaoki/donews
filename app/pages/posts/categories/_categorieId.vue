<template lang="html">
  <div class="page">
    <PostCardList :heading="heading" :posts="filteredPostList" />
    <div v-if="hasError" class="section">
      <p>誠に申し訳ございません。お探しのキーワードのストーリーはございません。</p>
    </div>
    
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
    const targetID = Number(this.$route.params.categorieId)
    const target = this.$store.state.content.categories.all.find(
      c => Number(c.id) === targetID
    )
    const filteredPostList = this.$store.state.content.posts.all.filter(post =>
      post.categories.some(c => Number(c.id) === targetID)
    )
    const hasError = filteredPostList.length === 0
    return {
      heading: '"' + target.name + '"',
      filteredPostList,
      hasError,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
