<template lang="html">
<section class="sub-navigation-recommended-tag-list">
  おすすめタグ
  <p v-for="(r, i) in recommendedTagList" :key="'recommendedTagList' + i">
      <a :href="`/posts/tags/${r.id}`">{{ r.name }}</a>
  </p>
</section>
</template>

<script>
export default {
  props: {
    recommendedTagList: { type: Array },
  },
}
</script>

<style lang="css" scoped>
.sub-navigation-recommended-tag-list{
    margin: 5px;
    border: 1px solid
}
</style>
