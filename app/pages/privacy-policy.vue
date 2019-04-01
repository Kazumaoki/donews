<template lang="html">
  <div class="page additionalPages">
    <section class="section">
      <h1 class="section-heading">{{ $store.state.content.additionalPages.privacyPolicy.title }}</h1>
      <div class="content" v-html="$store.state.content.additionalPages.privacyPolicy.body" />
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

<style lang="scss">
</style>
