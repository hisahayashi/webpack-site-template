<template>
  <div id="wrap">
    <the-header :is-show-logo="!loading" :is-show-back="false" />

    <!-- contents -->
    <article id="index" :class="{'open': isOpen}">

      <header class="title_section">
        <h1></h1>
      </header>

      <section class="common_section">
      </section>

    </article>
    <!-- //contents -->

    <the-footer :is-show-logo="true" />
    <the-loader :is-show="loading" />
  </div>
</template>
<script lang="ts">
declare global { interface Window {jQuery: any; $: any;}}
window.jQuery = window.jQuery || {};
window.$ = window.$ || {};

import Vue from 'vue'
import SweetScroll from 'sweet-scroll'
import sleep from '../utils/Sleep'
import Utils from '../utils/Utils'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import TheLoader from '../components/TheLoader.vue'
import SampleData from '../data/SampleData'

const $ = require('jquery')
window.jQuery = $
window.$ = $
require('jquery.easing')
const imagesLoaded = require('imagesloaded')
let mousewheelevent:any

let Component = Vue.extend({

  data() {
    return {
      loading: true,
      isDestroyed: false,
      isOpen: false
    }
  },

  components: {
    TheHeader,
    TheFooter,
    TheLoader
  },

  created() {
  },

  mounted() {
    this.loading = false
  },

  beforeDestroy() {
    this.isDestroyed = true
  },

  destroyed(){},

  computed: {
  },

  methods: {
  }

})

export default Component
</script>
