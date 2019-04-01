<template lang="html">
  <div class="page">
    <Post :p="post" />
    <Footer />
  </div>
</template>

<script>
import Post from '~/components/posts/Post.vue'
import Footer from '~/components/navigations/Footer.vue'
import Meta from '~/assets/mixins/meta.js'
export default {
  mixins: [Meta],
  components: {
    Post,
    Footer,
  },
  data() {
    const targetID = Number(this.$route.params.postId)
    const post = this.$store.state.content.posts.all.find(
      post => post.id === targetID
    )
    console.log(post.eyeCatch)
    return {
      meta: {
        title: post.title,
        description: post.excerpt,
        type: 'site',
        url: post.url,
        image: post.eyeCatch,
      },
      post,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
