<template lang="html">
  <section class="post section">
    <!-- <img width="100%" :src="p.eyeCatch" /> -->
    <div class="title-container">
      <div class="date">
        <!-- <span>CREATED: {{p.date.created}}</span> -->
        <span>UPDATED: {{p.date.modified}}</span>
      </div>
      <h1 class="title">{{p.title}}</h1>
      <div class="excerpt" v-if="p.excerpt" v-html="p.excerpt" />
    </div>
    <!-- <div class="eyeCatch" :style="{backgroundImage: `url(${p.eyeCatch})`}"/> -->
    <div class="requestButton top" type="button" name="button" v-on:click="go"><span>資料請求はこちら</span></div>
    <p>
      <ShareButtonsStyled
      :title="p.title"/>
    </p>
    <!-- <div>tag : {{p.tags}}</div> -->
    <!-- <div>categorie : {{p.categories}}</div> -->
    <div v-html="p.body"/>
    <div class="requestButton bottom" type="button" name="button" v-on:click="go"><span>資料請求はこちら</span></div>
  </section>
</template>

<script>
// production mode
const firebase = require('firebase/app')
require('firebase/auth')

import ShareButtonsStyled from '~/components/posts/ShareButtonsStyled'

export default {
  components: {
    ShareButtonsStyled,
  },
  props: {
    p: { type: Object },
  },
  methods: {
    go() {
      firebase.auth().onAuthStateChanged(loginUser => {
        const isLogin = loginUser !== null
        const to = isLogin
          ? '/document-request?postId=' + this.$props.p.id
          : '/my-page?requestDocuments=true&postId=' + this.$props.p.id
        this.$router.push(to)
      })
    },
  },

  async mounted() {
    const p = this.$props.p
    this.$store.commit('setUserDataForDocumentRequestAppend', {
      entryTitle: p.title,
      entryTagName: p.tags.map(t => t.name).join(', '),
      sendDate: new Date(),
    })
  },
}
</script>

<style lang="scss">
@import '~assets/style/common.scss';
.post {
  img {
    padding: 1em 0;
    display: block;
    width: 100%;
    height: auto;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    font-size: 1.07em;
    line-height: 1.6;
    padding: 1.8em 0 1em;
  }
  h2 {
    padding: 2em 0 1.7em;
    font-size: 1.3em;
    @include md {
      font-size: 1.6em;
    }
  }
  h3 {
    font-size: 1.1em;
  }

  p {
    padding: 0.8em 0 1.2em;
    line-height: 2;
    font-size: 16px;
    font-weight: 300;
    color: $grey9;
  }

  blockquote {
    margin: 1em;
    background: $white;
    padding: 1em;
    p {
      padding: 0;
      color: $grey8;
    }
    cite {
      display: block;
      padding-top: 1em;
      font-size: 0.8em;
      opacity: 0.5;
    }
  }

  figcaption {
    font-size: 0.9em;
    // font-style: italic;
    opacity: 0.6;
    padding: 0.6em 0;
    line-height: 1.8;
  }

  .title-container {
    padding: 6vw 0 4vw;
    @include sm {
      padding: 6vw 0 4vw;
    }
    @include futura;
    .title {
      font-size: 2.8vw;
      font-weight: 700;
      line-height: 1.7;
      letter-spacing: 0.06em;
      padding: 0.4em 0 0;
      @include sm {
        font-size: 1.4em;
      }
    }
    .date {
      // display: inline-block;
      padding-left: 0.1em;
      font-size: 0.9rem;
      line-height: 2;
      opacity: 0.4;
      letter-spacing: 0.16em;
      @include sm {
        font-size: 0.8rem;
      }
    }
  }

  .requestButton {
    position: relative;
    margin: 0 auto 6.5vw;
    width: 80vw;
    max-width: 460px;
    height: 3.4em;
    @include sm {
      margin-bottom: 8.2vw;
      height: 2.9em;
    }
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background: $positive;
    background: linear-gradient(22deg, $positive, rgb(116, 204, 136));
    border-radius: 3em;
    box-shadow: 0 4px 10px 0 rgba(47, 105, 82, 0.13);
    color: $white;
    cursor: pointer;
    @include transition-ease-out;
    &:hover {
      filter: brightness(1.1);
      box-shadow: 0 8px 24px 0 rgba(33, 94, 70, 0.2);
    }
    span {
      font-weight: 700;
      position: relative;
      bottom: 0.04em;
      letter-spacing: 0.1em;
    }
    &.bottom {
      margin: 6.6vw auto;
    }
  }
}
</style>
