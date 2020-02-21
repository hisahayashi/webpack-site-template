<template>
  <div id="wrap">
    <the-header :is-show-logo="true" :is-show-back="true" />

    <!-- contents -->
    <article class="common_container">

      <header class="title_section">
        <h1></h1>
      </header>

      <section class="common_section">
        <div class="text">お探しのページが見つかりませんでした。<br>お手数ですが、トップページから再度ご覧になりたいページをお探しください。</div>
        <p class="btn"><router-link :to="{name: 'Index', params: {}}">トップへ</router-link></p>
      </section>

    </article>
    <!-- //contents -->

    <the-footer :is-show-logo="false" />
    <the-loader v-if="loading" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import TheLoader from '../components/TheLoader.vue'

let Component = Vue.extend({

  data() {
    return {
      loading: true
    }
  },

  components: {
    TheHeader,
    TheFooter,
    TheLoader,
  },

  created() {
  },

  mounted() {
    this.loading = false
  },

  computed: {
  },

  methods: {
  }

})

export default Component
</script>
