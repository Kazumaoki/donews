<template lang="html">
  <section class="sub-navigation-categorie-list">
    カテゴリ一覧
    <p v-for="(c, i) in categorieList" :key="'categorieList' + i">
        <a :href="`/posts/categories/${c.id}`">{{ c.name }}</a>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    categorieList: { type: Array },
  },
}
</script>

<style lang="css" scoped>
  .sub-navigation-categorie-list{
      margin: 5px;
      border: 1px solid
  }
</style>
