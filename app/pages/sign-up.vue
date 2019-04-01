<template lang="html">
  <div class="page">
    <MailAuthentication />
    <Footer/>
  </div>
</template>

<script>
import MailAuthentication from '~/components/contacts/MailAuthentication.vue'
import Footer from '~/components/navigations/Footer.vue'
export default {
  components: {
    MailAuthentication,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/common.scss';
</style>
