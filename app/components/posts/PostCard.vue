<template lang="html">
  <router-link :to="post.url" class="card">
    <div class="img" :style="{backgroundImage: `url(${post.eyeCatch})`}"/>
    <div class="caption">
      <h1>{{ post.title }}</h1>
      <p class="update">{{ post.date.created }}</p>
      <div class="category">
        {{ categorieName }}
      </div>
    </div>
    <div class="over" />
  </router-link>
</template>

<script>
export default {
  props: {
    post: { type: Object },
  },
  data() {
    let categorieName
    try {
      categorieName = this.$props.post.categories.filter(
        c => c.name.indexOf('_') === -1
      )[0].name
    } catch (e) {
      categorieName = 'なし'
    }
    return {
      linkUrl: '/posts/' + this.$props['post']['id'],
      categorieName,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/style/common.scss';
.card {
  position: relative;
  display: block;
  background: $white;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 2px 6px 18px 0 rgba(0, 0, 0, 0.03);
  @include sm {
    margin-bottom: 9vw;
    &:last-child {
      margin-bottom: 0;
    }
  }
  @include md {
    width: 30.8%;
    $margin: calc((100% - 30.8% * 3) / 2);
    margin-bottom: $margin;
    &:nth-child(3n + 1) {
      margin-right: $margin;
    }
    &:nth-child(3n + 2) {
      margin-right: $margin;
    }
    transition: all ease 0.8s 0.1s;
    &:hover {
      box-shadow: 2px 6px 32px 0 rgba(0, 0, 0, 0.16);
      z-index: 2;
    }
  }

  .img {
    display: block;
    width: 100%;
    height: 0;
    padding-top: 58%;
    background: grey;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(0.9) saturate(1.1);
    @include transition-ease-out;
  }

  .caption {
    position: relative;
    margin: 1em 1.2em 1.5em;
    padding-bottom: 1.5em;
    font-size: 1rem;
    color: $grey8;
    line-height: 1;
    h1 {
      margin-bottom: 0.5em;
      padding-left: 0.08em;
      font-weight: 600;
      line-height: 1.6;
      height: calc(1.6em * 3);
      overflow: hidden;
    }
    .update {
      font-size: 0.8em;
      position: absolute;
      right: 0.15em;
      bottom: 0.12em;
      letter-spacing: 0.12em;
      opacity: 0.4;
    }
    .category {
      position: absolute;
      left: 0;
      bottom: -0.33em;
      padding: 0.25em 0.9em 0.38em;
      display: inline-block;
      font-size: 0.8em;
      font-weight: 500;
      letter-spacing: 0.8px;
      color: $grey9;
      background: $grey1;
      border: 1px solid $grey2;
      border-radius: 1em;
      opacity: 0.6;
    }
  }

  .over {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($white, 0.2);
    pointer-events: none;
    z-index: 3;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: transform ease 2s, opacity ease 0.7s;
  }
  @include md {
    &:hover {
      .over {
        transition: transform ease 0.6s, opacity ease 0.8s;
        transform: scale(1.8);
        opacity: 1;
      }
    }
  }
}
</style>
