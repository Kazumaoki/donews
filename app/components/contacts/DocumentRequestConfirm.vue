<template lang="html">
  <section>
    <p>
      body<pre>{{body}}</pre>
    </p>
    <p>
      append<pre>{{append}}</pre>
    </p>
    この内容で資料請求しますか？<button type="button" name="button" v-on:click="go">Go!</button>
  </section>
</template>

<script>
export default {
  props: {
    body: { type: Object },
    append: { type: Object },
  },
  methods: {
    go() {
      window.alert('資料請求しました！（嘘）')
    },
  },
}
</script>

<style lang="css" scoped>
</style>
