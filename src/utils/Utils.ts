let Utils = {
  created() {
    // console.log('mixin hook called')
  },
  methods: {
    zeropad(number:number, length:number): string{
      // console.log('component hook called')
      return (Array(length).join('0') + number).slice(-length);
    },
  }
}

export default Utils