<template>
  <header id="head" :class="{ 'scrollOver': isScrollOver }">

    <h1 class="logo" v-if="isShowLogo"><router-link :to="{name: 'Index', params: {}}" @click.native="routerClick"></router-link></h1>
    <p class="back" v-if="isShowBack"><router-link :to="{name: 'Index', params: {}}">Back</router-link></p>

    <nav id="gnav" class="gnav" ref="gnav">

      <transition name="scale-fade" mode="out-in" appear>
        <p class="bg" v-if="isShowNav" @click="closeMenu"></p>
      </transition>

      <transition name="gnav-scale-fade" mode="out-in" appear>
        <div class="inner" v-if="isShowNav">
          <ul class="nav">
            <li><router-link :to="{name: 'Index', params: {}}" @click.native="routerClick">Top</router-link></li>
            <li><router-link :to="{name: 'About', params: {}}" @click.native="routerClick">About</router-link></li>
            <li><router-link :to="{name: 'Contact', params: {}}" @click.native="routerClick">Contact</router-link></li>
          </ul>
        </div>
      </transition>

    </nav>

    <p id="menu" class="menu">
      <a href="javascript:void(0);" @click="toggleMenu" class="menu_trigger" :class="{'active': isShowNav}">
        <p class="cont">
          <span></span>
          <span></span>
          <span></span>
        </p>
      </a>
    </p>

  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Utils from '../utils/Utils'
import UserAgant from '../utils/UserAgant'

declare function require(x: string): any
const $ = require('jquery')

let Component = Vue.extend({

  mixins: [Utils],

  props: {
    'isShowLogo': {type: Boolean, default: true},
    'isShowBack': {type: Boolean, default: true}
  },

  // watch: {
  //   isWhite: function(newVal, oldVal) {
  //     console.log('Prop changed: ', newVal, ' | was: ', oldVal)
  //   }
  // },

  data() {
    return {
      isShowNav: false,
      mediaQuery: null as any,
      isScrollOver: true,
      isHome: false,
    }
  },

  components: {
  },

  created() {
    this.addMediaQuery()

    if(this.$route.name == 'Index') this.isHome = true
    $(window).on('scroll', this.scroll)
  },

  mounted() {
  },

  destroyed() {
    $(window).off('scroll')
    this.mediaQuery.removeListener(this.handle)
  },

  computed: {
  },

  methods: {

    toggleMenu():void {
      if(this.isShowNav){
        this.closeMenu()
      }
      else{
        this.openMenu()
      }
    },

    openMenu():boolean {
      let $gnav:any = this.$refs.gnav
      this.isShowNav = true
      return false
    },

    closeMenu():boolean {
      let $gnav:any = this.$refs.gnav
      this.isShowNav = false
      return false
    },

    scroll():void {
      let pos:number = $(window).scrollTop()
      let wh:number = $(window).height()
      if(pos > 0){
        if(!this.isScrollOver) this.isScrollOver = true
      }
      else{
        if(this.isScrollOver) this.isScrollOver = false
      }
    },

    routerClick():void {
      this.closeMenu()
      // return false
    },

    addMediaQuery(){
      this.mediaQuery = window.matchMedia('(max-width: 667px)')
      // ページが読み込まれた時に実行
      this.handle(this.mediaQuery)
      // ウィンドウサイズが変更されても実行されるように
      this.mediaQuery.addListener(this.handle)
    },

    handle(mq:any) {
      console.log('mq', mq)
      if (mq.matches) {
        // this.isEnableHamburger = true
      }
      else {
        // this.isEnableHamburger = false
      }
    }

  }
})

export default Component
</script>
