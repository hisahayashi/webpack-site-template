declare function require(str: string): any
const $:any = require('jquery')

export default {

  bind(el:any, binding:any):void {
    // console.log('Vue.directive', 'bind', el, binding)
    el.classList.add('before-enter')

    let inViewport:any = (el:any) => {
      // console.log('Vue.directive', 'inViewport', el, binding)
      let rect:any = el.getBoundingClientRect()
      return !(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight)
    }

    el.$onScroll = () => {
      if (inViewport(el)) {
        el.classList.add('enter')
        el.classList.remove('before-enter')
        binding.def.unbind(el, binding)
      }
    }
    $(document).on('scroll', el.$onScroll)
  },

  inserted(el:any, binding:any):void {
    // console.log('Vue.directive', 'inserted', el, binding)
    el.$onScroll()
  },

  unbind(el:any):void {
    // console.log('Vue.directive', 'unbind', el, binding)
    $(document).off('scroll', el.$onScroll)
    delete el.$onScroll
  }
}
