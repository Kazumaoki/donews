<template>
  <footer class="footer">
    <div class="links">
      <router-link to="/" class="link">DoNEWS</router-link>
      <router-link
        v-for="(r, i) in [...$store.state.content.navs.main, ...$store.state.content.navs.sub]"
        :key="i"
        :to="{ path: r.path }"
        class="link">{{ r.name }}</router-link>
        <a class="link" href="https://mojikaku.co.jp">運営会社</a>
    </div>
    <small>&copy; mojikaku inc.</small>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.footer {
  position: relative;
  margin-top: 50px;
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: 0.06em;
  width: 100%;
  height: 10vw;
  @include sm {
    height: 300px;
  }
  min-height: 160px;
  background: $grey1;
  background: linear-gradient(180deg, $white, $grey1);
  color: $grey7;
  text-align: center;

  .links {
    padding-top: 2.4em;
    @include md {
      margin: 0 auto;
      width: 96vw;
      max-width: 760px;
    }
    font-weight: 600;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    .link {
      padding: 1em 1.6em 0;
      cursor: pointer;
      @include sm {
        padding: 2em 1.5em;
        width: 33%;
      }
    }
  }

  small {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4.7em;
    opacity: 0.6;
  }
}
</style>
