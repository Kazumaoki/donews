<template lang="html">
  <div class="page">
    <section class="section">
      <h1 class="section-heading">ご請求ありがとうございます。</h1>

      <p class="notice">DoNEWSをご利用いただきありがとうございます。</p>
      <p class="notice">ご登録いただいた以下のメールアドレスに、担当者よりご連絡をいたします。</p>
      <p class="email">{{$store.state.userDataForDocumentRequest.data.body.email}}</p>
    </section>

    <Footer />
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
@import '~assets/style/common.scss';

.page {
  .title {
    font-weight: 600;
    font-size: 1.1em;
    letter-spacing: 0.1em;
    line-height: 1.6;
  }

  p {
    line-height: 1.7;
    color: $grey8;
  }

  .notice {
    padding: 2em 0 1em;
    opacity: 0.6;
    font-weight: 500;
  }

  .email {
    padding: 0.4em 1em;
    border: 1px solid $grey2;
    display: inline-block;
    border-radius: 3px;
  }

  .entryTitle {
    margin-bottom: 5em;
    padding: 1em;
    font-weight: 500;
    font-size: 1em;
    line-height: 1.8;
    background: $white;
  }
}
</style>
