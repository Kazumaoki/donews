<template lang="html">
  <section class="sub-navigation">
    サブナビゲーションだよ
    <SubNavigationCategorieList :categorieList="categorieList" />
    <SubNavigationRecommendedTagList :recommendedTagList="recommendedTagList" />
  </section>
</template>

<script>
import SubNavigationCategorieList from '~/components/navigations/SubNavigationCategorieList.vue'
import SubNavigationRecommendedTagList from '~/components/navigations/SubNavigationRecommendedTagList.vue'
export default {
  components: {
    SubNavigationCategorieList,
    SubNavigationRecommendedTagList,
  },
  props: {
    categorieList: { type: Array },
    recommendedTagList: { type: Array },
  },
}
</script>

<style lang="css" scoped>
.sub-navigation {
  background: rgb(196, 202, 255)
}
</style>
