import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from './pages/Index.vue'
import About from './pages/About.vue'
import Works from './pages/Works.vue'
import WorksDetail from './pages/WorksDetail.vue'
import Contact from './pages/Contact.vue'
import NotFound from './pages/NotFound.vue'

Vue.use(VueRouter)

const site_title = 'Title is Here'
const site_desc = ''
const sep = ' | '

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
      meta: { title: site_title, description: site_desc },
    },
    // {
    //   name: 'About',
    //   path: '/about',
    //   component: About,
    //   meta: { title: 'About Us' + sep + site_title, description: site_desc },
    // },
    // {
    //   name: 'Works',
    //   path: '/works',
    //   component: Works,
    //   meta: { title: 'Works' + sep + site_title, description: site_desc },
    // },
    // {
    //   path: '/works',
    //   component: WorksDetail,
    //   children: [
    //     {
    //       name: 'WorksDetail',
    //       path: '/works/:id',
    //       meta: { title: 'Works' + sep + site_title, description: site_desc },
    //     }
    //   ]
    // },
    {
      name: 'NotFound',
      path: '/404',
      component: NotFound,
      meta: { title: '404' + sep + site_title, description: site_desc },
    },
    {
      path: '*',
      redirect: { name: 'NotFound' },
    },
  ],
  scrollBehavior (_to, _from, savedPosition) {
    let position = { x: 0, y: 0 }
    if (savedPosition) {
      position = savedPosition
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position)
      }, 1000)
    })
  }
})

router.beforeEach((_to, _from, _next) => {
  // console.log('[Routes.ts]', 'router.beforeEach', _to, _from)

  /* 404 */
  if (!_to.matched.length) {
    _next('/404')
  } else {
    _next()
  }

  document.title = _to.meta.title

  let metaDiscre: any = document.head.children
  let metaLength: any = metaDiscre.length

  for(var i = 0; i < metaLength; i++){
    var proper = metaDiscre[i].getAttribute('name')
    if(proper === 'description'){
      var dis = metaDiscre[i]
      dis.setAttribute('content', _to.meta.description)
    }
  }

})

router.afterEach((_to)=> {
})

export default router
