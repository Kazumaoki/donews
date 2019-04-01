<template lang="html">
  <section class="reccomended-tag-list">
    <h1 class="list-title">{{ title }}</h1>
  </section>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'TAG TITLE' },
    tags: { type: Array },
  },
}
</script>

<style lang="css" scoped>
@import '~assets/style/common.scss';
.reccomended-categorie-post-list {
  background: orange;
}
</style>
