<template lang="html">
  <div class="page">
    <button  @click="update">更新する</button>
    <p>更新が反映されるまでには数分から数十分かかる場合があります。</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    update() {
      const url = 'https://api.netlify.com/build_hooks/5ca32b2d68bcef032f582d4c'
      const message = '更新を開始しました。'
      axios.post(url).then(response => {
        window.alert(message)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  line-height: 3;
  text-align: center;
  p {
    padding: 1em;
  }
  button {
    margin: 4em auto 1em;
    padding: 1em 3em;
    border-radius: 5px;
    background: rgb(38, 190, 117);
    color: white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
