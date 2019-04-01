<!-- <template>
  <div>
    <button @click="$store.commit('getTags')" name="button">getTags</button>
    <button @click="$store.commit('getCategories')" name="button">getCategories</button>
    <button @click="$store.commit('getAllPosts')" name="button">全件取得</button>

    <div v-if="$store.state.posts.status">
    <Post
      v-for="(data, i) in $store.state.posts.data"
      :key="i"
      :data="data"/>
    </div>
    <div v-else>
      データの取得に失敗しました。
    </div>
  </div>


</template>

<script>
import Post from '~/components/Post.vue'
export default {
  components: {
    Post,
  },
}
</script>

<style lang="scss">
img {
  width: 100%;
  height: auto;
}
</style> -->