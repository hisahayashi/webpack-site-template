import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from './routes'
import VueScrollTo from 'vue-scrollto'
import ScrollShowDirective from './directive/ScrollShowDirective'

let scrollVars:any = {
  container: 'body',
  duration: 500,
  easing: [0.785, 0.135, 0.150, 0.860],
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
}

Vue.use(Vuex)
Vue.use(VueScrollTo, scrollVars)

interface Todo {
  id: number
  text: string
}

interface State {
}


let store = new Vuex.Store({

  state: {
  } as State,

  getters: {
  },

  actions: {
  },

  mutations: {
  }

})

let scrollShowDirective:any = ScrollShowDirective
Vue.directive('vpshow', scrollShowDirective)

let v = new Vue({
    el: '#app',
    template: `
    <main>
      <transition name="fade" mode="out-in" appear>
        <router-view />
      </transition>
    </main>`,
    data: {
    },
    components: {
    },
    created(){
    },
    store: store,
    router: VueRouter
})
