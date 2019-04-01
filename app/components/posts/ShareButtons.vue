<template lang="html">
  <div class="shareButtons">
    <!--
      Twitter
        参考 URL
          https://publish.twitter.com/#
        シェア用 URL 指定の必要性
          無し
    -->
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      class="twitter-share-button"
      data-show-count="false"
    >Tweet
    </a>
    <script
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
    ></script>


    <!--
      facebook
        参考 URL
          https://developers.facebook.com/docs/plugins/share-button/?translation
        シェア用 URL 指定の必要性
            有り
              data-href 属性が使用される
              属性に指定する値は、コンポーネントが props で取得した値をバインドする
    -->
    <div id="fb-root"></div>
    <script
      async defer crossorigin="anonymous"
      src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v3.2&appId=2336543609913397&autoLogAppEvents=1"
    ></script>
    <div
      class="fb-share-button"
      :data-href="`${url}`"
      data-layout="button_count"
      data-size="small"
    >
      <a
        target="_blank"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
        class="fb-xfbml-parse-ignore"
      >シェア
      </a>
    </div>

    <!--
      pocket
        参考 URL
          https://getpocket.com/publisher/button
        シェア用 URL 指定の必要性
          無し
    -->
    <a
      data-pocket-label="pocket"
      data-pocket-count="none"
      class="pocket-btn"
      data-lang="ja"
    ></a>
    <script type="text/javascript">
      !function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");
    </script>
  </div>
</template>

<script>
export default {
  props: {
    url: { type: String },
  },
}
</script>

<style lang="scss" scoped>
</style>
